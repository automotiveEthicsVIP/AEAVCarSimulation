## Requirements

Before running the code, ensure you have the following installed:

### 1. Python 3.x
Make sure you have Python 3.x installed on your system. You can download Python from [python.org](https://www.python.org/downloads/).

### 2. Graphviz

Graphviz is required to generate UML diagrams. Follow the instructions for your operating system to install it.

#### On Ubuntu/Debian:
```bash
sudo apt-get install graphviz
```

#### On macOS (via Homebrew):
```bash
brew install graphviz
```

#### On Windows:
- Download the installer from the [official Graphviz website](https://graphviz.org/download/).
- Run the installer and follow the setup instructions.
- Add the Graphviz `bin` directory to your system's PATH. The path is typically:
  ```
  C:\Program Files\Graphviz\bin
  ```

To verify Graphviz installation, run the following command in your terminal or command prompt:
```bash
dot -V
```
This should return the installed version of Graphviz.

### 3. Install the `graphviz` Python package

You also need the Python `graphviz` package. You can install it via `pip`:
```bash
pip install graphviz
```

## Running the Code

```bash
python your_script_name.py
```

This will generate two PNG images (`kantian_tree.png` and `utilitarian_tree.png`) that represent the decision trees for Kantian and Utilitarian ethical frameworks.

## Output

- **kantian_tree.png**: Decision tree for Kantian ethics.
- **utilitarian_tree.png**: Decision tree for Utilitarian ethics.
