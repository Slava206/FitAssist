from importlib import import_module

try:
    _settings_module = import_module("pydantic_settings")
    BaseSettings = _settings_module.BaseSettings
    SettingsConfigDict = _settings_module.SettingsConfigDict
except ImportError:
    from pydantic import BaseSettings

    SettingsConfigDict = None


class Settings(BaseSettings):
    if SettingsConfigDict is not None:
        model_config = SettingsConfigDict(
            env_file=".env",
            env_file_encoding="utf-8",
            extra="ignore",
        )
    else:
        class Config:
            env_file = ".env"
            env_file_encoding = "utf-8"
            extra = "ignore"

    app_name: str = "FitAssist API"
    debug: bool = False
    database_url: str = (
        "postgresql+psycopg2://fitassist:fitassist@localhost:5432/fitassist"
    )
    cors_origins: list[str] = ["http://localhost:5173"]


settings = Settings()