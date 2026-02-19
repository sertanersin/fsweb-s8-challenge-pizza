describe('Pizza Sipariş Akışı Testi', () => {
  
  beforeEach(() => {
    // Projenin ana sayfasına git
    cy.visit('http://localhost:5173/');
  });

  it('Ana sayfadan sipariş formuna başarıyla geçiyor', () => {
    cy.get('.home-button').should('contain', 'ACIKTIM').click();
    cy.url().should('include', '/siparis');
    cy.contains('Position Absolute Acı Pizza').should('be.visible');
  });

  it('Form validasyonları ve sipariş özeti doğru çalışıyor', () => {
    cy.visit('http://localhost:5173/siparis');

    // Başlangıçta buton pasif olmalı
    cy.get('.order-button').should('be.disabled');

    // 1. Boyut Seçimi
    cy.get('input[value="Orta"]').check();

    // 2. Hamur Seçimi
    cy.get('select').select('İnce');

    // 3. Malzeme Seçimi (En az 4 tane)
    const malzemeler = ['Pepperoni', 'Sosis', 'Mısır', 'Sucuk'];
    malzemeler.forEach(m => {
      cy.contains(m).click();
    });

    // Buton aktifleşti mi?
    cy.get('.order-button').should('not.be.disabled');

    // 4. Fiyat Kontrolü
    // Baz: 85.50 + (4 malzeme * 5) = 105.50
    cy.get('.summary-row-total').should('contain', '105.50');

    // Adet artırma
    cy.contains('+').click(); // Adet 2 oldu
    cy.get('.summary-row-total').should('contain', '211.00');
  });

  it('Tam bir sipariş döngüsünü tamamlıyor ve başarı sayfasına ulaşıyor', () => {
    cy.visit('http://localhost:5173/siparis');

    // Formu doldur
    cy.get('input[value="Büyük"]').check();
    cy.get('select').select('Orta');
    
    const secimler = ['Pepperoni', 'Sosis', 'Mısır', 'Sucuk', 'Biber'];
    secimler.forEach(m => cy.contains(m).click());

    cy.get('textarea').type('Kapıyı çalmadan bırakın.');

    // API isteğini yakala
    cy.intercept('POST', 'https://reqres.in/api/pizza').as('pizzaPost');

    // Siparişi gönder
    cy.get('.order-button').click();

    // API yanıtını bekle
    cy.wait('@pizzaPost');

    // Başarı sayfası kontrolleri
    cy.url().should('include', '/success');
    cy.get('.yellow-text').should('contain', 'lezzetin yolda');
    cy.get('h1').should('contain', 'SİPARİŞ ALINDI');
    
    // Formdan gelen verilerin Success ekranında göründüğünü doğrula
    cy.get('.order-summary').within(() => {
      cy.contains('Büyük').should('be.visible');
      cy.contains('Orta').should('be.visible');
      cy.contains('Pepperoni, Sosis, Mısır, Sucuk, Biber').should('be.visible');
    });
  });

});