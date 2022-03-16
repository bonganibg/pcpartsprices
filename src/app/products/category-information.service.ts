import { Injectable } from '@angular/core';
import { filter } from 'rxjs';
import { SolidStateDrive } from '../model/cateogory-specific/ssd.model';
import { FilterSection } from '../model/filter.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryInformationService {

  constructor() { }

  // Change the hard drive and SSD to use range


  // COoler Information
  coolerInfo = {
    Type: [
      "Air Cooler",
      "AIO"
    ],
    Radiator: [
      "92",
      "120",
      "140",
      "240",
      "280",
      "360",
      "420"
    ]
  }

  // GPU Information
  graphicsInfo = {
    model: [
      "gt 710",
      "gt 720",
      "gt 730",
      "gt 1030",
      "gtx 1050",
      "gtx 1060",
      "gtx 1070",
      "gtx 1080",
      "gtx 1650",
      "gtx 1660",
      "rtx 2060",
      "rtx 2070",
      "rtx 2080",
      "rtx 3050",
      "rtx 3060",
      "rtx 3070",
      "rtx 3080",
      "rtx 3090",
      "rx 6900",
      "rx 6800",
      "rx 6700",
      "rx 6600",
      "rx 5700",
      "vega 64",
      "rx 8200",
      "rx 6500",
      "rx 5500",
      "rx 590",
      "rx 580",
      "rx 570",
      "rx 560"
    ],
    chipmaker: [
      "AMD",
      "Nvidia"
    ],
    memory: [
      "3gb",
      "4gb",
      "6gb",
      "8gb",
      "10gb",
      "12gb",
      "16gb",
      "24gb",
      "32gb"
    ]
  }

  // Memory
  memoryInfo = {
    DDR: [
      2,
      3,
      4,
      5
    ],
    Capacity: [
      1,
      2,
      4,
      8,
      16,
      32,
      64,
      128,
    ],
    Speed: [
      2400,
      2600,
      2666,
      2800,
      2933,
      3000,
      3200,
      3300,
      3333,
      3400,
      3466,
      3600,
      3733,
      3866,
      4000,
      4133,
      4266,
      4400,
      4600,
      4800,
      5000,
      5133,
      5200,
      5333,
      5600,
      6000,
      2133,
      1333,
      1600,
      1866,
      800
    ]
  }


  // Motherboard
  motherboardInfo = {
    Chipmaker: [
      "Intel",
      "AMD"
    ]
  }


  getGraphic()
  {
    let filters: FilterSection[] = [
      {
        Heading: "Chipmaker",
        Options: this.graphicsInfo.chipmaker
      },
      {
        Heading: "Memory",
        Options: this.graphicsInfo.memory
      },
      {
        Heading: "Model",
        Options: this.graphicsInfo.model
      }
    ];
    return filters;
  }

  getMemory()
  {
    let filters: FilterSection[] = [
      {
        Heading: "DDR",
        Options: this.memoryInfo.DDR
      },
      {
        Heading: "Capacity",
        Options: this.memoryInfo.Capacity
      },
      {
        Heading: "Speed",
        Options: this.memoryInfo.Speed
      }
    ];
    return filters;
  }

  getCooler()
  {
    let filters: FilterSection[] = [
      {
        Heading: "Radiator",
        Options: this.coolerInfo.Radiator
      },
      {
        Heading: "Type",
        Options: this.coolerInfo.Type
      }
    ];
    return filters;
  }

  getMotherboard()
  {
    let filters: FilterSection[] = [
      {
        Heading: "Chipmaker",
        Options: this.motherboardInfo.Chipmaker
      }
    ];
    return filters;
  }
}
