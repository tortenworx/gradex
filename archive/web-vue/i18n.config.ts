export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      login: {
        main: 'Log-in to your account',
        username: 'Username o Student ID',
        password: 'Password',
        submit: 'Log-in',
        errors: {
          required: 'This field is required.',
          min_8: "This field must have 8 or more characters."
        },
      },
      home: {
        greetings: {
          h1_day: 'Good morning',
          h1_afternoon: 'Good afternoon',
          h1_night: 'Good evening',
          h2: 'What do you want to do today?'
        },
        cards: {
          view_grades: {
            h1: 'View Grade Report',
            h2: 'View your current grade report and see your improvement, and other metadata.'
          },
          current_classes: {
            h1: 'Current Classes',
            h2: 'View your current classes for this semester.'
          },
          create_class: {
            h1: 'Create Class',
            h2: 'Create a new class.'
          },
          view_classes: {
            h1: 'List All Classes',
            h2: 'View, edit, and delete classes in this current semester.'
          },
          new_report: {
            h1: 'New Grade Report',
            h2: 'Create grade reports on a chosen class.'
          },
          view_reports: {
            h1: 'Past Reports',
            h2: 'View previously filed reports on your classes.'
          },
          settings: {
            h1: 'Settings',
            h2: 'Change certain properties.'
          },
          users_list: {
            h1: 'List All Users',
            h2: 'List all students, teachers and staff currently registered in the system.'
          }
        }
      }
    },
    fil: {
      login: {
        main: 'Mag-login sa iyong account',
        username: 'Username o Student ID',
        password: 'Password',
        submit: 'Mag-login',
        errors: {
          required: 'Dapat malagyan ang field na ito.',
          min_8: "Dapat malagyan ng 8 o higit pang mga character."
        },
      },
      home: {
        greetings: {
          h1_day: 'Magandang umaga',
          h1_afternoon: 'Magandang hapon',
          h1_night: 'Magandang gabi',
          h2: 'Ano ang gusto mong gawin ngayong araw?'
        },
        cards: {
          view_grades: {
            h1: 'Mga Ulat sa Marka',
            h2: 'Tingnan ang iyong kasalukuyang ulat ng grado at tingnan ang iyong pagpapabuti, at iba pang impormasyon.'
          },
          current_classes: {
            h1: 'Mga Kasalukuyan na Klase',
            h2: 'Tingnan ang iyong kasalukuyang mga klase para sa semestreng ito.'
          },
          create_class: {
            h1: 'Bagong Klase',
            h2: 'Gumawa ng bagong klase.'
          },
          view_classes: {
            h1: 'Listahan ng mga Klase',
            h2: 'Tingnan, baguhin, at burahin ang mga klaseng nakalista sa sistema sa kasalukuyang semestre.'
          },
          new_report: {
            h1: 'Bagong Grade Report',
            h2: 'Gumawa ng bagong grade report sa napiliping kase.'
          },
          view_reports: {
            h1: 'Mga Nakaraang Ulat',
            h2: 'Tingnan ang mga naunang nai-file na ulat sa iyong mga klase.'
          },
          settings: {
            h1: 'Mga Settings',
            h2: 'Baguhin ang mga bagay sa iyong account.'
          },
          users_list: {
            h1: 'Listahan ng mga Users',
            h2: 'Ilista ang lahat ng mga mag-aaral, guro at kawani na kasalukuyang nakarehistro sa system.'
          }
        }
      }
    }
  }
}))