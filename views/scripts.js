document.addEventListener('DOMContentLoaded', function () {
    // โหลดไฟล์ CSV
    fetch('C:\Users\PC\Desktop\senior\web map\data_ta.csv')
        .then(response => response.text())
        .then(data => {
            // แปลง CSV เป็น Array ของ Object
            const markersData = csvToArray(data);

            // สร้างแผนที่
            const map = createMap();

            // เพิ่ม marker ลงในแผนที่
            addMarkersToMap(map, markersData);
        })
        .catch(error => console.error('Error:', error));
});

function csvToArray(csv) {
    // แปลง CSV เป็น Array ของ Object
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');
        const obj = {};

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentLine[j].trim();
        }

        result.push(obj);
    }

    return result;
}

function createMap() {
    // สร้างแผนที่ด้วย Leaflet
    const map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    return map;
}

function addMarkersToMap(map, markersData) {
    // เพิ่ม marker ลงในแผนที่
    markersData.forEach(marker => {
        const lat = parseFloat(marker.latitude);
        const lng = parseFloat(marker.longitude);

        // สร้าง marker และเพิ่มลงในแผนที่
        L.marker([lat, lng]).addTo(map).bindPopup(marker.name);
    });
}
