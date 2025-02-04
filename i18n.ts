export default defineI18nConfig(() => ({
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
        label: 'Username or ID Number',
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
      },
      new_pw: {
        header: "Reset your password",
        greetings: "Greetings, ",
        not_you: "Not you?",
        new_password: "New Password",
        confirm_password: "Confirm Password",
        submit: "Reset Password",
        submitting: "Submitting...",
        errors: {
          min_8: "Your new password should be a minimum of 8 characters.",
          match: "Passwords must match."
        }
      },
    },
    }
    }))