    function tampilkanHalaman(nama) {
      document.getElementById("beranda").style.display = "none";
      document.getElementById("tentang").style.display = "none";
      document.getElementById("data").style.display = "none";
      document.getElementById("aksi").style.display = "none";

      document.getElementById(nama).style.display = "block";
      if (nama == "data") {
    tampilkanGrafikPerilaku();
}

      aturTombolAktif(nama);

      window.scrollTo(0, 0);
    }

    function aturTombolAktif(nama) {
  
      document.getElementById("navBeranda").style.color = "#374151";
      document.getElementById("navTentang").style.color = "#374151";
      document.getElementById("navData").style.color = "#374151";
      document.getElementById("navAksi").style.color = "#374151";

      document.getElementById("navBeranda").style.borderBottom = "3px solid transparent";
      document.getElementById("navTentang").style.borderBottom = "3px solid transparent";
      document.getElementById("navData").style.borderBottom = "3px solid transparent";
      document.getElementById("navAksi").style.borderBottom = "3px solid transparent";

      if (nama == "beranda") {
        document.getElementById("navBeranda").style.color = "#16a34a";
        document.getElementById("navBeranda").style.borderBottom = "3px solid #16a34a";
      }
      else if (nama == "tentang") {
        document.getElementById("navTentang").style.color = "#16a34a";
        document.getElementById("navTentang").style.borderBottom = "3px solid #16a34a";
      }
      else if (nama == "data") {
    document.getElementById("navData").style.color = "#16a34a";
    document.getElementById("navData").style.borderBottom = "3px solid #16a34a";
}
else if (nama == "aksi") {
    document.getElementById("navAksi").style.color = "#16a34a";
    document.getElementById("navAksi").style.borderBottom = "3px solid #16a34a";
}
    }

    var menuSedangTerbuka = false;

    function bukaTutupMenu() {
      if (menuSedangTerbuka == false) {
        document.getElementById("menuMobile").style.display = "block";
        menuSedangTerbuka = true;
      } else {
        document.getElementById("menuMobile").style.display = "none";
        menuSedangTerbuka = false;
      }
    }

    var jumlahKomitmen = 128;

    function tambahKomitmen() {
      jumlahKomitmen = jumlahKomitmen + 1;

      document.getElementById("jumlahKomitmen").innerHTML = jumlahKomitmen;

      document.getElementById("tombolKomitmen").innerHTML = "Terima kasih atas komitmenmu!";
      document.getElementById("tombolKomitmen").disabled = true;
    }

    var grafikPerilaku = null;
    var grafikRataRata = null;

async function tampilkanGrafikPerilaku() {

    if (grafikPerilaku != null) {
        return;
    }

    try {
        const response = await fetch("data/data-perilaku-energi.json");
        const data = await response.json();
        tampilkanGrafikRataRata(data);

        const kategori = data.ringkasan.kategori;

        const ctx = document.getElementById("grafikPerilaku");

        grafikPerilaku = new Chart(ctx, {
            type: "bar",

            data: {
                labels: ["Sangat Baik", "Baik", "Cukup", "Kurang"],

                datasets: [{
                    label: "Jumlah Siswa",
                    data: [
                        kategori["Sangat Baik"],
                        kategori["Baik"],
                        kategori["Cukup"],
                        kategori["Kurang"]
                    ],
                    backgroundColor: [
                        "#16a34a",
                        "#65a30d",
                        "#facc15",
                        "#ef4444"
                    ]
                }]
            },

            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    } catch (error) {
        console.log("Gagal mengambil data JSON:", error);
    }
}

function tampilkanGrafikRataRata(data) {

    if (grafikRataRata != null) {
        return;
    }

    const tertinggi = data.ringkasan.sorotan.butir_tertinggi;
    const terendah = data.ringkasan.sorotan.butir_terendah;

    const semuaButir = [...tertinggi, ...terendah];

    const ctx = document.getElementById("grafikRataRata");

    grafikRataRata = new Chart(ctx, {
        type: "bar",

        data: {
            labels: semuaButir.map(item => item.label),

            datasets: [{
                label: "Rata-rata Skor",
                data: semuaButir.map(item => item.rata_rata),
                backgroundColor: "#16a34a"
            }]
        },

        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4
                }
            }
        }
    });
}

    aturTombolAktif("beranda");
