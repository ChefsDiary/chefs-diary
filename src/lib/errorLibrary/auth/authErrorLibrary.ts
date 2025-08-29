import ErrorLibraryType from "@/lib/types/errorLibrary/ErrorLibraryType";
import { stringFormat } from "@/lib/utils/string";

const errorTexts: ErrorLibraryType = {
  registerUserMainError: "Registrace skončila chybou, zkuste to prosím znovu",
  userNameUserMainError: "Přihlášení skončilo chybou, zkuste to prosím znovu",
  userNameRequired: "Uživatelské jméno je povinné",
  userNameMinLength: "Uživatelské jméno musí obsahovat alespoň {0} znak",
  userNameMaxLength: "Uživatelské jméno může obsahovat maximálně {0} znak",
  userNameStartWithLetter: "Uživatelské jméno musí začínat písmenem",
  userNameAllowedCharacters:
    "Uživatelské jméno může obsahovat pouze písmena, čísla, pomlčku a podtržítko",
  userNameRestricted:
    "Byl zaznamenán velký počet přihlášení. Přihlášení je dočasně zablokováno z bezpečnostních důvodů. Zkuste to prosím za pár minut.",
  userNameExists: "Toto uživatelské jméno je již obsazené",
  emailRequired: "Email je povinný",
  emailInvalid: "Email není platná emailová adresa",
  emailExists: "Nelze vytvořit účet. Zkuste se přihlásit nebo si obnovit heslo",
  emailNotVerified: "Email není ověřený",
  emailMaxLength: "Email může obsahovat maximálně {0} znak",
  passwordRequired: "Heslo je povinné",
  passwordMinLength: "Heslo musí obsahovat alespoň {0} znak",
  passwordMaxLength: "Heslo může obsahovat maximálně {0} znak",
  passwordLoweCase: "Heslo musí obsahovat alespoň jedno malé písmeno",
  passwordUpperCase: "Heslo musí obsahovat alespoň jedno velké písmeno",
  passwordNumbers: "Heslo musí obsahovat alespoň jednu číslici",
  confirmPasswordRequired: "Heslo pro potvrzení je povinné",
  confirmPasswordOneOf: "Hesla se neshodují",
  incorrectLoginPassword: "Neplatné uživatelské jméno, nebo heslo",
  accessDenied: "Byl vám odepřen přístup",
  termsAgreementRequired: "Chybí souhlas s podmínkami",
  resendVerificationEmailMainError:
    "Odeslání nového odkazu skončilo chybou, zkuste to prosím znovu",
  verificationTokenNotFound: "E-mail pro odeslání odkazu není platný",
  verificationTokenExpired: "Platnost odkazu pro potvrzení e-mailu vypršela",
  verifyTokenMainError:
    "Ověřování emailu skončilo chybou, zkuste to prosím znovu",
  verifyEmailVerificationTokenNotFound:
    "Nelze ověřit e-mail - Odkaz již není platný",
  passwordResetMainError:
    "Nastavení nohého hesla se nepovedlo. Zkuste to prosím znovu.",
  passwordResetTokenNotFound: "Nelze obnovit heslo - Odkaz již není platný",
  passwordResetTokenExpired:
    "Nelze obnovit heslo - Platnost odkazu pro obnovení hesla vypršela",
  adminRequired: "Pro přihlášení nemáte dostatečná oprávnění",
  editorRequired: "Pro přihlášení nemáte dostatečná oprávnění",
  unitNameRequired: "Název jednotky je povinný",
  unitNameMaxLength: "Název jednotky může obsahovat maximálně {0} znak",
  unitDisplayNameRequired: "Zobrazované jméno jednotky je povinné",
  unitDisplayNameMaxLength:
    "Zobrazované jméno jednotky může obsahovat maximálně {0} znak",
  unitGroupNameRequired: "Název skupiny jednotek je povinný",
  unitGroupNameMaxLength:
    "Název skupiny jednotek může obsahovat maximálně {0} znak",
  ingredientGroupNameRequired: "Název skupiny ingrediencí je povinný",
  ingredientGroupNameMaxLength:
    "Název skupiny ingrediencí může obsahovat maximálně {0} znak",
};

const getErrorTextByKey = (key: keyof ErrorLibraryType, ...args: string[]) => {
  if (args.length > 0) {
    const errorText = stringFormat(
      errorTexts?.[key as keyof ErrorLibraryType] ?? key,
      ...args
    ).replace("znak", getZnakText(parseInt(args[0])));
    return errorText;
  }

  return errorTexts?.[key as keyof ErrorLibraryType] ?? key;
};

const getZnakText = (count: number) => {
  if (count === 1) return "znak";
  if (count >= 2 && count <= 4) return "znaky";
  return "znaků";
};

export default getErrorTextByKey;
