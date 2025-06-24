import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        sermons: 'Sermons',
        blog: 'Blog',
        gallery: 'Gallery',
        contact: 'Contact',
        admin: 'Admin'
      },
      home: {
        hero: {
          title: 'Welcome to Covenant Temple',
          subtitle: 'The Church of Pentecost - Anaji English Assembly',
          description: 'Join us in worship, fellowship, and spiritual growth as we serve God together in our community.',
          cta: 'Join Us Today'
        },
        sections: {
          welcome: 'Welcome Message',
          upcomingEvents: 'Upcoming Events',
          latestSermons: 'Latest Sermons',
          announcements: 'Announcements'
        }
      },
      about: {
        title: 'About Us',
        mission: 'Our Mission',
        vision: 'Our Vision',
        history: 'Our History',
        leadership: 'Leadership Team'
      },
      sermons: {
        title: 'Sermons',
        latest: 'Latest Sermons',
        watchVideo: 'Watch Video',
        listenAudio: 'Listen Audio'
      },
      blog: {
        title: 'Blog',
        latest: 'Latest Posts',
        readMore: 'Read More'
      },
      gallery: {
        title: 'Gallery',
        photos: 'Church Photos'
      },
      contact: {
        title: 'Contact Us',
        form: {
          name: 'Name',
          email: 'Email',
          subject: 'Subject',
          message: 'Message',
          send: 'Send Message',
          success: 'Message sent successfully!',
          error: 'Error sending message. Please try again.'
        },
        info: {
          address: 'Address',
          phone: 'Phone',
          email: 'Email',
          hours: 'Service Hours'
        }
      },
      admin: {
        title: 'Admin Dashboard',
        login: 'Login',
        logout: 'Logout',
        sections: {
          sermons: 'Manage Sermons',
          blogs: 'Manage Blogs',
          gallery: 'Manage Gallery',
          events: 'Manage Events',
          contacts: 'View Contacts'
        },
        actions: {
          add: 'Add New',
          edit: 'Edit',
          delete: 'Delete',
          save: 'Save',
          cancel: 'Cancel'
        }
      },
      common: {
        loading: 'Loading...',
        error: 'An error occurred',
        date: 'Date',
        time: 'Time',
        location: 'Location',
        author: 'Author',
        title: 'Title',
        description: 'Description',
        content: 'Content'
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        about: 'À Propos',
        sermons: 'Sermons',
        blog: 'Blog',
        gallery: 'Galerie',
        contact: 'Contact',
        admin: 'Admin'
      },
      home: {
        hero: {
          title: 'Bienvenue au Temple de l\'Alliance',
          subtitle: 'L\'Église de Pentecôte - Assemblée Anglaise',
          description: 'Rejoignez-nous dans l\'adoration, la communion et la croissance spirituelle alors que nous servons Dieu ensemble dans notre communauté.',
          cta: 'Rejoignez-nous Aujourd\'hui'
        },
        sections: {
          welcome: 'Message de Bienvenue',
          upcomingEvents: 'Événements à Venir',
          latestSermons: 'Derniers Sermons',
          announcements: 'Annonces'
        }
      },
      about: {
        title: 'À Propos de Nous',
        mission: 'Notre Mission',
        vision: 'Notre Vision',
        history: 'Notre Histoire',
        leadership: 'Équipe de Direction'
      },
      sermons: {
        title: 'Sermons',
        latest: 'Derniers Sermons',
        watchVideo: 'Regarder la Vidéo',
        listenAudio: 'Écouter l\'Audio'
      },
      blog: {
        title: 'Blog',
        latest: 'Derniers Articles',
        readMore: 'Lire Plus'
      },
      gallery: {
        title: 'Galerie',
        photos: 'Photos de l\'Église'
      },
      contact: {
        title: 'Nous Contacter',
        form: {
          name: 'Nom',
          email: 'Email',
          subject: 'Sujet',
          message: 'Message',
          send: 'Envoyer le Message',
          success: 'Message envoyé avec succès!',
          error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
        },
        info: {
          address: 'Adresse',
          phone: 'Téléphone',
          email: 'Email',
          hours: 'Heures de Service'
        }
      },
      admin: {
        title: 'Tableau de Bord Admin',
        login: 'Connexion',
        logout: 'Déconnexion',
        sections: {
          sermons: 'Gérer les Sermons',
          blogs: 'Gérer les Blogs',
          gallery: 'Gérer la Galerie',
          events: 'Gérer les Événements',
          contacts: 'Voir les Contacts'
        },
        actions: {
          add: 'Ajouter Nouveau',
          edit: 'Modifier',
          delete: 'Supprimer',
          save: 'Sauvegarder',
          cancel: 'Annuler'
        }
      },
      common: {
        loading: 'Chargement...',
        error: 'Une erreur s\'est produite',
        date: 'Date',
        time: 'Heure',
        location: 'Lieu',
        author: 'Auteur',
        title: 'Titre',
        description: 'Description',
        content: 'Contenu'
      }
    }
  },
  it: {
    translation: {
      nav: {
        home: 'Home',
        about: 'Chi Siamo',
        sermons: 'Sermoni',
        blog: 'Blog',
        gallery: 'Galleria',
        contact: 'Contatti',
        admin: 'Admin'
      },
      home: {
        hero: {
          title: 'Benvenuti al Tempio dell\'Alleanza',
          subtitle: 'La Chiesa di Pentecoste - Assemblea Inglese',
          description: 'Unitevi a noi nell\'adorazione, nella comunione e nella crescita spirituale mentre serviamo Dio insieme nella nostra comunità.',
          cta: 'Unisciti a Noi Oggi'
        },
        sections: {
          welcome: 'Messaggio di Benvenuto',
          upcomingEvents: 'Eventi Prossimi',
          latestSermons: 'Ultimi Sermoni',
          announcements: 'Annunci'
        }
      },
      about: {
        title: 'Chi Siamo',
        mission: 'La Nostra Missione',
        vision: 'La Nostra Visione',
        history: 'La Nostra Storia',
        leadership: 'Team di Leadership'
      },
      sermons: {
        title: 'Sermoni',
        latest: 'Ultimi Sermoni',
        watchVideo: 'Guarda Video',
        listenAudio: 'Ascolta Audio'
      },
      blog: {
        title: 'Blog',
        latest: 'Ultimi Post',
        readMore: 'Leggi Altro'
      },
      gallery: {
        title: 'Galleria',
        photos: 'Foto della Chiesa'
      },
      contact: {
        title: 'Contattaci',
        form: {
          name: 'Nome',
          email: 'Email',
          subject: 'Oggetto',
          message: 'Messaggio',
          send: 'Invia Messaggio',
          success: 'Messaggio inviato con successo!',
          error: 'Errore nell\'invio del messaggio. Riprova.'
        },
        info: {
          address: 'Indirizzo',
          phone: 'Telefono',
          email: 'Email',
          hours: 'Orari di Servizio'
        }
      },
      admin: {
        title: 'Dashboard Admin',
        login: 'Accedi',
        logout: 'Esci',
        sections: {
          sermons: 'Gestisci Sermoni',
          blogs: 'Gestisci Blog',
          gallery: 'Gestisci Galleria',
          events: 'Gestisci Eventi',
          contacts: 'Visualizza Contatti'
        },
        actions: {
          add: 'Aggiungi Nuovo',
          edit: 'Modifica',
          delete: 'Elimina',
          save: 'Salva',
          cancel: 'Annulla'
        }
      },
      common: {
        loading: 'Caricamento...',
        error: 'Si è verificato un errore',
        date: 'Data',
        time: 'Ora',
        location: 'Posizione',
        author: 'Autore',
        title: 'Titolo',
        description: 'Descrizione',
        content: 'Contenuto'
      }
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n