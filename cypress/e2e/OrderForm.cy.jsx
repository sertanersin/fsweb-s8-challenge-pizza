describe('Pizza Sipariş Formu Testleri', () => {
  beforeEach(() => {
    // Cypress.config.js'de baseUrl tanımlıysa '/' yeterlidir
    cy.visit('http://localhost:5173/siparis'); 
  });

  it('Sayfa başarıyla yükleniyor ve başlık görünüyor', () => {
    cy.contains('Position Absolute Acı Pizza').should('be.visible');
  });

  it('Form validasyonu: Eksik seçimlerle buton disabled olmalı', () => {
    // Başlangıçta butonun disabled olduğunu kontrol et
    cy.get('button.order-button').should('be.disabled');

    // Sadece boyut seç, hala disabled olmalı
    cy.get('input[value="Orta"]').check();
    cy.get('button.order-button').should('be.disabled');

    // Hamur seç, hala disabled (çünkü malzeme < 4)
    cy.get('select').select('İnce');
    cy.get('button.order-button').should('be.disabled');
  });

  it('Malzeme seçimi: En az 4 malzeme seçilince buton aktifleşmeli', () => {
    cy.get('input[value="Orta"]').check();
    cy.get('select').select('İnce');

    // 4 tane malzeme seç
    const malzemeler = ['Pepperoni', 'Sosis', 'Mısır', 'Sucuk'];
    malzemeler.forEach(m => {
      cy.contains(m).click();
    });

    // Artık buton tıklanabilir olmalı
    cy.get('button.order-button').should('not.be.disabled');
  });

  it('Fiyat hesaplaması doğru çalışıyor mu?', () => {
    // 85.5 (Baz) + (2 * 5.00) (Seçimler) = 95.50
    cy.get('input[value="Küçük"]').check();
    cy.get('select').select('Kalın');
    
    cy.contains('Pepperoni').click();
    cy.contains('Sosis').click();

    // Adeti 2 yap
    cy.contains('+').click();

    // Toplam: (85.5 + 10) * 2 = 191.00
    cy.get('.summary-row-total').should('contain', '191.00');
  });

  it('Sipariş notu yazılabiliyor mu?', () => {
    const not = "Zil çalmasın, kapıya bırakın.";
    cy.get('textarea')
      .type(not)
      .should('have.value', not);
  });

  it('Başarılı sipariş gönderimi ve yönlendirme', () => {
    // Formu doldur
    cy.get('input[value="Büyük"]').check();
    cy.get('select').select('Orta');
    ['Pepperoni', 'Sosis', 'Mısır', 'Sucuk'].forEach(m => cy.contains(m).click());

    // API isteğini yakalamak için (optional ama iyi bir pratik)
    cy.intercept('POST', 'https://reqres.in/api/pizza').as('postOrder');

    // Gönder
    cy.get('button.order-button').click();

    // Başarı sayfasına yönlendi mi?
    cy.url().should('include', '/success');
  });
});