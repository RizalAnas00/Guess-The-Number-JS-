// Mengambil referensi ke elemen-elemen DOM yang dibutuhkan
const guessButton = document.getElementById('guess-button');
const guessInput = document.getElementById('guess-input');
const compNumberElement = document.getElementById('comp-number');
const messageElement = document.getElementById('message');
const countdownElement = document.getElementById('countdown');


// Menghasilkan nomor acak antara 1 dan 200
//math.floor agar hasilnya angka bulat bukan desimal
let compNumber = Math.floor(Math.random() * 200) + 1;
compNumberElement.innerHTML = "**********"; // Menyembunyikan nomor komputer dengan asterisks

// Fungsi untuk mengecek tebakan pengguna
function guessNumber() {
    let userGuess = guessInput.value.trim(); // Mendapatkan input pengguna

    // Validasi input agar hanya angka yang diterima
    if (!/^\d+$/.test(userGuess)) {
        messageElement.innerHTML = 'For real, man? Read the Game Title!';
        return;
    }

    userGuess = parseInt(userGuess); // Mengubah string yang lolos validasi menjadi angka

    if (userGuess < 1 || userGuess > 200) {
        messageElement.innerHTML = 'Bruh... why you guess that number?';
        return;
    }

    // Perbandingan antara tebakan pengguna dan nomor komputer
    if (userGuess === compNumber) {
        compNumberElement.innerHTML = compNumber; // Menampilkan nomor komputer
        messageElement.innerHTML = 'CORRECT... YOU WIN!';
        setTimeout(() => {
            window.location.reload(); // Memuat ulang halaman
        }, 3800);

        let countdownValue = 4; 
        const countdownTimer = setInterval(() => {
            if (countdownValue > 0) {
                countdownValue--; // Kurangi nilai countdown
                countdownElement.innerHTML = countdownValue; // Update tampilan elemen
            } else {
                clearInterval(countdownTimer); // Hentikan interval ketika countdown mencapai 0
            }
        }, 1000); // Ubah angka setiap 1 detik (1000 milidetik)

    } else if (userGuess > compNumber) {
        messageElement.innerHTML = 'Lower!';
    } else if (userGuess < compNumber) {
        messageElement.innerHTML = 'Higher!';
    }
}


// Fungsi untuk menangani event
function handleEvent(event) {
    switch (event.type) {
        case 'click':
            guessNumber();
            break;
        case 'keypress':
            if (event.key === 'Enter') {
                guessNumber();
            }
            break;
    }
}

// Mengikat event listener ke tombol "Guess" dan input "Enter"
guessButton.addEventListener('click', handleEvent);
guessInput.addEventListener('keypress', handleEvent);
