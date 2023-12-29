const sonuc = document.getElementById("sonuc"); // HTML belgesindeki "sonuc" id'li elemanı seçer
const aramaKutusu = document.getElementById("aramaKutusu"); // HTML belgesindeki "aramaKutusu" id'li elemanı seçer
const aramaListesi = document.getElementById("aramaListesi"); // HTML belgesindeki "aramaListesi" id'li elemanı seçer

// JSON kaynağından aldığımız verileri sayfada tutmak için dizi değişkenleri oluşturuluyor
const anahtarKelimeler = []; // Anahtar kelimeleri tutacak bir dizi oluşturuluyor
const deyimler = []; // Deyimleri tutacak bir dizi oluşturuluyor

verileriYukle(); // verileriYukle fonksiyonu çağrılıyor

async function verileriYukle() { // Asenkron bir fonksiyon olan verileriYukle fonksiyonu tanımlanıyor
    const sunucuYaniti = await fetch("https://sozluk.gov.tr/atasozu"); // fetch API'si kullanılarak belirtilen URL'den veri alınıyor
    let veriler = await sunucuYaniti.json(); // Sunucudan dönen yanıt, JSON formatına dönüştürülüyor

    // "veri" değişkeni "veriler" değişkenindeki her bir verinin adı. (burada örnek olarak "veri" şeklinde kullandım)
    veriler.forEach(veri => { // Veriler dizisi üzerinde bir döngü başlatılıyor
        anahtarKelimeler.push(veri.anahtar); // Her bir verinin "anahtar" özelliği, anahtarKelimeler dizisine ekleniyor
        deyimler.push(veri.sozum); // Her bir verinin "sozum" özelliği, deyimler dizisine ekleniyor
    });

    const tekrarlananKelimeler = [...new Set(anahtarKelimeler)]; // Anahtar kelimeler dizisindeki tekrarlanan kelimeleri kaldırıyor

    tekrarlananKelimeler.sort(() => Math.random() - 0.5); // Tekrarlanan kelimeleri rastgele sıralıyor
    let sayac=0; // Bir sayaç değişkeni oluşturuluyor
    tekrarlananKelimeler.forEach(kelime => { // Tekrarlanan kelimeler dizisi üzerinde bir döngü başlatılıyor
        if (sayac < 5) { // Eğer sayaç 5'ten küçükse
            const yeniOneri = document.createElement("option") // Yeni bir "option" elemanı oluşturuluyor
            aramaListesi.appendChild(yeniOneri); // Yeni oluşturulan "option" elemanı, "aramaListesi" elemanının çocuğu olarak ekleniyor
            yeniOneri.value = kelime; // Yeni "option" elemanının değeri, döngüdeki kelime olarak ayarlanıyor
        }
        sayac++; // Sayaç bir artırılıyor
    })
    aramaKutusu.addEventListener("input", (e) => sonuclariFiltrele(e.target.value)); // "aramaKutusu" elemanına bir "input" olay dinleyicisi ekleniyor. Bu olay dinleyicisi, kullanıcı bir şey yazdığında tetiklenir

    function sonuclariFiltrele(arananKelime){ // sonuclariFiltrele fonksiyonu tanımlanıyor. Bu fonksiyon, kullanıcının arama kutusuna yazdığı kelimeyi parametre olarak alır
        sonuc.innerHTML=""; // "sonuc" elemanının içeriği temizleniyor
        const aramaKriteri = new RegExp(arananKelime, "gi"); // Kullanıcının arama kutusuna yazdığı kelime, bir düzenli ifadeye dönüştürülüyor
        let eslesenler = deyimler.filter(soz => aramaKriteri.test(soz)); // Deyimler dizisi, düzenli ifadeye uyan deyimler olacak şekilde filtreleniyor

        if (arananKelime.length < 3){ // Eğer kullanıcının arama kutusuna yazdığı kelimenin uzunluğu 3'ten küçükse
            eslesenler = []; // Eşleşenler dizisi boş bir dizi olacak şekilde ayarlanıyor
        }

        eslesenler.forEach(es => { // Eşleşenler dizisi üzerinde bir döngü başlatılıyor
            let siradakiSonuc = document.createElement("li"); // Yeni bir "li" elemanı oluşturuluyor
            sonuc.appendChild(siradakiSonuc); // Yeni oluşturulan "li" elemanı, "sonuc" elemanının çocuğu olarak ekleniyor
            siradakiSonuc.innerHTML = es; // Yeni "li" elemanının içeriği, döngüdeki eşleşme olarak ayarlanıyor
        })
    }
}
