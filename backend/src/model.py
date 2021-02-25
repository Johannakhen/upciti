import random
from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import AnyHttpUrl, BaseModel, Field


class StatusEnum(Enum):
    disconnected = "disconnected"
    connected = "connected"


class ConnectionTypeEnum(Enum):
    cellular = "cellular"
    ethernet = "ethernet"
    wifi = "wifi"

fake_macs = [
    "bb:82:56:5b:b0:c4",
    "97:ed:ba:94:a6:ee",
    "0d:81:b0:76:77:62",
    "4e:87:31:7f:fb:9e",
    "7a:d6:ae:88:5a:3e",
    "6a:5f:83:96:33:0e",
    "5a:7c:0a:be:0b:5d",
    "d4:24:1c:18:90:ef",
    "69:3d:2c:d0:7f:ef",
    "c7:04:42:6f:6c:01",
    "e0:c4:f6:7f:f9:91",
    "de:08:30:1a:92:d1",
    "2c:eb:7a:5a:8f:cf",
    "fa:4e:ee:4b:f2:55",
    "04:fd:8e:4a:ec:c7",
    "94:d8:8c:72:42:bf",
    "ad:f3:1b:4e:06:68",
    "d0:4c:8d:51:58:cf",
    "d4:b5:31:9b:75:95",
    "20:15:b1:57:2c:31",
]

class Device(BaseModel):
    """ Full device object """

    url: Optional[AnyHttpUrl] = Field(
        None, title="Device URL", description="URL for this ressource"
    )

    status: Optional[StatusEnum] = Field(
        None,
        title="Connection status",
        description="Indicates whether the device is reachable via network",
    )

    last_seen_at: datetime = Field(
        ...,
        title="Last seen",
        description="UTC time when the device was last seen online",
    )

    connection_type: Optional[ConnectionTypeEnum] = Field(
        None,
        title="Connection type",
        description="Indicates which network is in use - cellular, ethernet or wifi",
    )

    mac_wifi: Optional[str] = Field(
        None, title="WiFi MAC", description="WiFi adapter's MAC address"
    )

    sim_id: Optional[str] = Field(
        None, title="SIM ID", description="SIM card ID (if present)"
    )

    voltage: Optional[float] = Field(
        None, title="Voltage", description="Battery voltage"
    )

    serial_number: str = Field(
        None, title="Serial number", description="Device serial number"
    )

    class Config:
        schema_extra = {
            "example": {
                "url": "https://fake.url/487",
                "status": "disconnected",
                "last_seen_at": "2020-07-09T07:44:05.627103+00:00",
                "connection_type": "wifi",
                "mac_wifi": "b8:27:eb:6b:0b:2e",
                "sim_id": None,
                "voltage": None,
                "serial_number": None,
            }
        }


def generate_device() -> Device:
    rr = random.randint(1, 100)
    status = StatusEnum("connected") if rr > 50 else StatusEnum("disconnected")
    dev: Device = Device(
        url=f"https://fake.url/{rr}",
        status= status,
        last_seen_at = datetime.now(),
        connection_type = ConnectionTypeEnum("cellular"),
        mac_wifi = fake_macs[random.randint(0, len(fake_macs)-1)],
        sim_id = "SomeFakeString",
        voltage = random.uniform(1.0, 12.0),
        serial_number = f"device_{rr}"
    )
    return dev
