from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import matplotlib.pyplot as plt
import io
import base64
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SimulationInputParams(BaseModel):
    x_min: float
    x_max: float
    t_max: float
    nx: int
    nt: int
    c: float

def heaviside(t):
    """Function H"""
    return np.where(t > 0, 1, 0)

def G(x, t, c):
    """Source G(s) = H(t - r/c) / (2c), where r = |x|"""
    r = np.abs(x)
    delay = t - r / c
    return heaviside(delay) / (2 * c)

@app.post("/simulate/")
async def simulate(params: SimulationInputParams):
    try:
        x = np.linspace(params.x_min, params.x_max, params.nx)
        t = np.linspace(0, params.t_max, params.nt)
        dx = x[1] - x[0]
        dt = t[1] - t[0]
        c2_dt2_dx2 = (params.c * dt / dx) ** 2

        # Check stability
        if c2_dt2_dx2 > 1:
            raise HTTPException(
                status_code=400, detail=f"Stability condition violated: c^2 (dt/dx)^2 = {c2_dt2_dx2:.2f} > 1"
            )

        # Initialize wave field
        u = np.zeros((params.nt, params.nx))
        u_prev = np.zeros(params.nx)
        u_next = np.zeros(params.nx)

        # Start params
        u[0, :] = np.exp(-((x - (params.x_min + params.x_max) / 2) ** 2) / 0.1)  # Гауссовый импульс
        u[1, :] = u[0, :]  # Нулевая скорость

        # Main cycle
        for n in range(1, params.nt - 1):
            for i in range(1, params.nx - 1):
                source = G(x[i], t[n], params.c)
                u_next[i] = (
                    2 * u[n, i]
                    - u[n - 1, i]
                    + c2_dt2_dx2 * (u[n, i + 1] - 2 * u[n, i] + u[n, i - 1])
                    + dt ** 2 * source
                )
            u[n + 1, :] = u_next

        # Graph generation
        buf_initial = io.BytesIO()
        plt.figure()
        plt.plot(x, u[0, :], label="Initial Condition")
        plt.title("Initial Condition")
        plt.xlabel("Space")
        plt.ylabel("Amplitude")
        plt.legend()
        plt.savefig(buf_initial, format="png")
        buf_initial.seek(0)
        graph_initial = base64.b64encode(buf_initial.read()).decode("utf-8")
        buf_initial.close()

        buf_wave = io.BytesIO()
        plt.figure()
        plt.imshow(
            u, extent=[params.x_min, params.x_max, 0, params.t_max], aspect="auto", origin="lower", cmap="hot"
        )
        plt.title("Wave Propagation Over Time")
        plt.xlabel("Space")
        plt.ylabel("Time")
        plt.colorbar(label="Amplitude")
        plt.savefig(buf_wave, format="png")
        buf_wave.seek(0)
        graph_wave = base64.b64encode(buf_wave.read()).decode("utf-8")
        buf_wave.close()

        buf_source = io.BytesIO()
        plt.figure()
        G_values = G(x[:, None], t[None, :], params.c)
        plt.imshow(
            G_values, extent=[params.x_min, params.x_max, 0, params.t_max], aspect="auto", origin="lower", cmap="viridis"
        )
        plt.title("Source Function G(s)")
        plt.xlabel("Space")
        plt.ylabel("Time")
        plt.colorbar(label="Source Intensity")
        plt.savefig(buf_source, format="png")
        buf_source.seek(0)
        graph_source = base64.b64encode(buf_source.read()).decode("utf-8")
        buf_source.close()

        return {
            "graphs": {
                "initial": graph_initial,
                "wave": graph_wave,
                "source": graph_source,
            },
            "stability_condition": bool(c2_dt2_dx2 <= 1),
            "unique_solution": bool(np.all(np.isfinite(u))),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
