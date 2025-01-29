export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  availableLocales: [
    {
      code: "en",
      name: "English"
    },
    {
      code: "fil",
      name: "Filipino"
    }
  ],
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
      },
      invitation_resend: {
        title: "Resend Invitation",
        desc: "In order to resend another invitation link, please enter your details below. If we found a record that matches the information that you have provided, we will send the new invitation in your school email address.",
        label: "ID Number",
        button_action: 'Resend Invite',
        button_action_ongoing: 'Submitting',
        return: 'Return to Log-in',
        errors: {
          invalid: "Invalid ID Number provided. Check the number, then try again.",
          required: "Your ID Number is required"
        },
        sidenote: "Notice! Please ensure that the letters in your ID Number are uppercase to ensure proper delivery of your invitation."
      },
      pw_reset: {
        return: "Return to log-in",
        title: "Send Password Reset Link",
        desc: "To create a password reset link, please enter your ID Number below. If we found a record that matches the information that you have provided, we will send the password reset link in your school email address.",
        button_action: 'Send Reset Link',
        button_action_ongoing: 'Submitting',
        errors: {
          invalid: "Invalid ID Number provided. Check the number, then try again.",
          required: "Your ID Number is required"
        },
      },
      sidebar: {
        'home': 'Dashboard',
        'usr_settings': 'Settings',
        'global_vars': 'System Settings',
      },
      footer: {
        'desc': 'GradeX is a capstone project made to fullfil the requirements for Practical Research 2. Read more about our research paper',
        'link': 'here',
        'rights': 'All rights reserved',
        'parts': {
          'links': 'Links',
          'services': 'Services',
          'color_mode': 'Color Mode',
          'language': 'Language'
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
      },
      pw_reset: {
        return: "Bumalik sa log-in",
        title: "Magpadala ng Link para sa Pag-reset ng Password",
        desc: "Upang makagawa ng link para sa pag-reset ng password, ilagay ang iyong ID Number sa ibaba. Kung mayroon kaming nakitang record na tumutugma sa iyong detalyeng inilakap, ipapadala namin ang link para sa pag-reset ng password sa iyong school email address.",
        button_action: 'Ipadala ang link para sa pag-reset',
        button_action_ongoing: 'Sinusumite',
        errors: {
          invalid: "Maling ID Number ang inilagay, tingnan ang iyong ID number at subukan muli.",
          required: "Kailangan ilagay ang iyong ID Number."
        },
      },
      invitation_resend: {
        title: "Magpadala ng Bagong imbitasyon",
        desc: "Para makapagpadala ng bagong link na imbitasyon, maaring ilagay ng iyong mga detalye sa baba. Kung mayroon kaming nakitang record na tumutugma sa iyong detalyeng inilakap, ipapadala namin ang bagong imbitasyon sa iyong school email address.",
        label: "ID Number",
        button_action: 'Magpadala ng bagong imbitasyon',
        button_action_ongoing: 'Submitting',
        return: 'Bumalik sa Log-in',
        errors: {
          invalid: "Hindi tama ang inilagay na ID number, tingnan ang iyong ID number at subukan muli.",
          required: "Kailangan ilagay ang iyong ID Number."
        },
        sidenote: "Paalala! Itiyak naka malaking titik ang mga letra sa iyong ID number para sa mas mabisang pagpapadala ng iyong imbitasyon."
      },
      sidebar: {
        'home': 'Dashboard',
        'usr_settings': 'Settings',
        'global_vars': 'Settings ng Sistema',
      },
      footer: {
        'desc': 'Ang GradeX ay isang proyektong capstone para tuparin ang mga kinakailangan sa Praktikal na Pananaliksik. Para sa impormasyon para sa aming papel, pumunta',
        'link': 'dito',
        'rights': 'Reserbado ang lahat ng karapatan',
        'parts': {
          'links': 'Mga Links',
          'services': 'Mga Serbisyo',
          'color_mode': 'Madilim na tema',
          'language': 'Wika'
        }
      }
    },
  }
}))