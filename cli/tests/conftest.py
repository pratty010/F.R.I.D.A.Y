import os
import pytest
from pathlib import Path

@pytest.fixture
def puraguin_home(tmp_path, monkeypatch):
    home = tmp_path / "puraguin"
    home.mkdir()
    monkeypatch.setenv("PURAGUIN_HOME", str(home))
    return home
