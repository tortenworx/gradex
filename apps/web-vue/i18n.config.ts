import en from '~/i18n/languages/en.json'
export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    en,
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
        label: 'Username o Numbero sa ID',
        errors: {
          invalid: "Maling Username o ID Number ang inilagay, tingnan ang iyong ID number at subukan muli.",
          required: "Kailangan ilagay ang iyong username."
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
      },
      new_pw: {
        header: "Palitan ang iyong password",
        greetings: "Kamusta, ",
        not_you: "Hindi ikaw?",
        new_password: "Bagong Password",
        confirm_password: "Ulitin ang Password",
        submit: "Paltan ang iyong password",
        submitting: "Ipinapasa...",
        errors: {
          min_8: "Ang iyong bagong password ay dapat hindi bababa ng 8 na mga karakter.",
          match: "Dapat magkatugma ang mga password."
        }
      },
      '': ''
    },
  }
}))