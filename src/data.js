// Datos que no dependen del idioma. Los textos están en src/content/<idioma>.js
// Lo marcado con "REVISAR" necesita confirmación del cliente antes de publicar.

export const brand = {
  name: 'Implantes Dentales Barcelona',
  doctor: 'Dr. Diego Uribe Echevarría',
  doctorShort: 'Dr. Uribe Echevarría',
  phone: '+34 697 427 707',
  phoneHref: 'tel:+34697427707',
  // REVISAR: la web actual no indica el número de WhatsApp; se usa el teléfono principal
  whatsappNumber: '34697427707',
  clinicPhone: '+34 931 14 66 89',
  clinicPhoneHref: 'tel:+34931146689',
  address: 'Carrer de Sant Gervasi de Cassoles, 49',
  city: '08022 Barcelona',
  mapsHref: 'https://maps.app.goo.gl/pN1afryhSuCJ7Xny9',
  reviewsHref: 'https://www.google.com/search?q=clinica+dr+uribe+echevarria',
  instagram: 'https://www.instagram.com/implantesdentalesbcn/',
  instagramDoctor: 'https://www.instagram.com/druribeechevarria',
  facebookDoctor: 'https://www.facebook.com/dr.uribeechevarria',
}

export const whatsappHref = (text) => `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(text)}`

export const treatmentImages = {
  implantes: '/img/implante-unitario.webp',
  'all-on-4': '/img/all-on-4.webp',
  'all-on-6': '/img/all-on-6.webp',
  rehabilitacion: null,
}

export const clinics = [
  { id: 'bcn', city: 'Barcelona', name: 'Clínica Dental Dr. Uribe Echevarría', href: 'https://maps.app.goo.gl/pN1afryhSuCJ7Xny9', main: true },
  { id: 'cornella', city: 'Cornellà', name: 'Clínica Dental Pérez Marquina', href: 'https://maps.app.goo.gl/ZFz2SNVMTFmsGdau9' },
  { id: 'gava', city: 'Gavà', name: 'Clínica Dental Dra. Patricia Pérez', href: 'https://maps.app.goo.gl/nJ4ToxiSvijDn25S8' },
  { id: 'badalona', city: 'Badalona', name: 'Digest Clínica Dental', href: 'https://maps.app.goo.gl/tDd71gYkkHndEmQJ7' },
]

// REVISAR: la web actual dice "6 clínicas" pero solo lista 4
export const stats = [
  { id: 'years', value: 30, prefix: '+' },
  { id: 'since', value: 1994, plain: true },
  { id: 'clinics', value: 4 },
  { id: 'hours', value: 24, suffix: ' h' },
]

// Casos clínicos: fotos del cliente, recortadas para que cada par coincida en el comparador.
// REVISAR: confirmar el consentimiento de cada paciente y que cada par sea de la misma persona (el par caso-5, que se ve como "Caso 3", no lo parece).
export const cases = [3, 4, 5, 6, 7].map((n) => ({
  before: `/img/casos/caso-${n}-antes.webp`,
  after: `/img/casos/caso-${n}-despues.webp`,
}))
