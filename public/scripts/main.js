/*
 * Contoh kode untuk membaca query parameter,
 * Siapa tau relevan! :)
 * */

// const e = require("express");

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

/*
 * Contoh penggunaan DOM di dalam class
 * */

class App {
  constructor() {
    this.form = document.querySelector("#search-form");
    this.result = document.querySelector("#result");
  }

  init() {
    this.form.addEventListener("submit", (e) => this.filterCars(e));
  }

  populateCars(cars) {
    return cars.map((car) => {
      return {
        ...car,
        availableAt: new Date(car.availableAt).getTime(),
      };
    });
  }

  async filterCars(e) {
    e.preventDefault();
    const response = await fetch(
      "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
    );
    const body = this.populateCars(await response.json());

    const formData = new FormData(e.target);
    const tanggal = new Date(formData.get("tanggal")).getTime();
    const passengerCapacity = parseInt(formData.get("penumpang") || 0);

    const availableCars = body.filter(
      (car) => car.availableAt > tanggal && car.capacity >= passengerCapacity
    );

    console.log(availableCars);
    this.viewSearchResult(availableCars);
  }

  viewSearchResult(cars) {
    let html = "";
    for (let i = 0; i < cars.length; i++) {
      const car = cars[i];
      html += 
        `<div class="card-result">
            <div class="content">
                <img src=${car.image} class="img-fluid"/>
                <div style="align-self: stretch; height: 120px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: flex">
                    <div style="color: black; font-size: 14px; font-family: Helvetica; font-weight: 400; line-height: 20px; word-wrap: break-word">${car.type}/${car.model}</div>
                    <div style="align-self: stretch; color: black; font-size: 16px; font-family: Helvetica; font-weight: 700; line-height: 24px; word-wrap: break-word">Rp ${car.rentPerDay} / hari</div>
                    <div style="width: 301px; color: black; font-size: 14px; font-family: Helvetica; font-weight: 300; line-height: 20px; word-wrap: break-word">${car.description}</div>
                </div>
                <div style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 8px; display: inline-flex">
                    <div style="width: 20px; height: 20px; position: relative">
                        <div style="width: 2.50px; height: 4.89px; left: 16.67px; top: 12.61px; position: absolute; border: 1px #8A8A8A solid"></div>
                        <div style="width: 13.33px; height: 5px; left: 0.83px; top: 12.50px; position: absolute; border: 1px #8A8A8A solid"></div>
                        <div style="width: 2.51px; height: 6.46px; left: 13.33px; top: 2.61px; position: absolute; border: 1px #8A8A8A solid"></div>
                        <div style="width: 6.67px; height: 6.67px; left: 4.17px; top: 2.50px; position: absolute; border: 1px #8A8A8A solid"></div>
                    </div>
                    <div style="flex: 1 1 0; color: black; font-size: 14px; font-family: Helvetica; font-weight: 300; line-height: 20px; word-wrap: break-word">${car.capacity} orang</div>
                </div>
                <div style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 8px; display: inline-flex">
                    <div style="width: 20px; height: 20px; position: relative">
                        <div style="width: 5px; height: 5px; left: 7.50px; top: 7.50px; position: absolute; border: 1px #8A8A8A solid"></div>
                        <div style="width: 18.33px; height: 18.33px; left: 0.83px; top: 0.83px; position: absolute; border: 1px #8A8A8A solid"></div>
                    </div>
                    <div style="flex: 1 1 0; color: black; font-size: 14px; font-family: Helvetica; font-weight: 300; line-height: 20px; word-wrap: break-word">${car.transmission}</div>
                </div>
                <div style="align-self: stretch; justify-content: flex-start; align-items: center; gap: 8px; display: inline-flex">
                    <div style="width: 20px; height: 20px; position: relative">
                        <div style="width: 15px; height: 15px; left: 2.50px; top: 3.33px; position: absolute; border: 1px #8A8A8A solid"></div>
                        <div style="width: 15px; height: 0px; left: 2.50px; top: 8.33px; position: absolute; border: 1px #8A8A8A solid"></div>
                        <div style="width: 0px; height: 3.33px; left: 13.33px; top: 1.67px; position: absolute; border: 1px #8A8A8A solid"></div>
                        <div style="width: 0px; height: 3.33px; left: 6.67px; top: 1.67px; position: absolute; border: 1px #8A8A8A solid"></div>
                    </div>
                    <div style="flex: 1 1 0; color: black; font-size: 14px; font-family: Helvetica; font-weight: 300; line-height: 20px; word-wrap: break-word">Tahun ${car.year}</div>
                </div>
            </div>
            <div class="btn-choose" role="button">Pilih Mobil</div>
        </div>`;
    }

    this.result.innerHTML = html;
  }
}

const app = new App();
app.init();
