export function getTanggalHariIniWIB() {
    const tanggal = new Date().toLocaleDateString('id-ID', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    // Ubah dari format dd/mm/yyyy ke yyyy-mm-dd
    const [day, month, year] = tanggal.split('/');
    return `${year}-${month}-${day}`;
}
