
# AEAV Car Simulation

This repository contains a car simulation for automotive ethics research. The purpose of this simulation is to run a virtual autonomous vehicle (AV) in an environment and adjust the learning model by manipulating the environment parameters.

## Setup Instructions

### Clone the Repository

To get started, clone the repository from GitHub using the following command:

```bash
git clone https://github.com/automotiveEthicsVIP/AEAVCarSimulation.git
```

### Running the Live Server

To run the simulation on a live server, follow these steps:

1. Navigate to the cloned repository directory:

    ```bash
    cd AEAVCarSimulation
    ```

2. Run the live server for the application. Depending on the setup, this can be done using a server framework such as `http-server`, or another live server tool.

    For example, if using `http-server`:

    ```bash
    npm install -g http-server
    http-server
    ```

3. Open the provided URL in a browser to interact with the simulation.

### Create an Environment using the World Editor

Once the server is running, use the built-in world editor to create an environment for the car. The environment can be configured based on various parameters related to the simulation such as terrain, obstacles, and traffic.

### Training the Car

The simulation allows the autonomous vehicle to be trained in the created environment. Training can be controlled by adjusting parameters in the `run/main.js` file.

1. Open `run/main.js` in your preferred code editor.
2. Look for the variables `N` and `α`. These variables control:

   - **N**: The number of iterations or frames for training the car.
   - **α**: The learning rate or an adjustment factor that influences the car's behavior.

   Example code snippet:
   ```javascript
   const N = 100; // Number of iterations
   const α = 0.01; // Learning rate
   ```

3. Modify the values of `N` and `α` to adjust the training process according to your needs.
4. After making changes, save the file and restart the simulation to apply the changes.

## Notes

- Make sure to install all necessary dependencies before running the simulation. Dependencies can be installed using:

  ```bash
  npm install
  ```

- For additional configurations or troubleshooting, refer to the repository's documentation or raise an issue on GitHub.

## Contribution

If you would like to contribute to this project, please follow the repository's guidelines for contributing. Feel free to open issues and submit pull requests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
