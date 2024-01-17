import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next
    .use(initReactI18next)
    .init({
        fallbackLng: 'sk',
        resources: {
            gb: {
                translation: {
                    button: {
                        close: 'Close',
                        button: 'Button',
                        confirm: 'Confirm',
                        cancel: 'Cancel',
                        error: 'Error',
                        shadows: 'Shadows',
                        send: 'Send for price calculations',
                        sendDesign: 'Send',
                        preview: 'Preview',
                        wardrobeSettings: 'Wardrobe settings',
                        newDesign: 'New design',
                        dimensions: 'Dimensions',
                        corpusMaterial: 'Corpus material',
                        ironworks: 'Ironworks material',
                        leftPartition: 'Wall from left',
                        rightPartition: 'Wall from right',
                        removeSection: 'Remove section',
                        addSection: 'Add section',
                        removeDoor: 'Remove door',
                        addDoor: 'Add door',
                        editWardrobe: 'Edit wardrobe',
                        editSections: 'Edit sections',
                        editDoors: 'Edit doors',
                        editDoorsParts: 'Edit doors parts',
                        changePhotoWallpaper: 'Change photo wallpaper',
                        applySelectedSectionToAll: 'Apply layout to all sections',
                        applySelectedDoorToAll: 'Apply selected type to all doors',
                        applySelectedPhotoWallpaperToAll: 'Apply photo wallpaper to every door part',
                        applyMaterialToSelectedDoor: 'Apply material to all parts of selected door',
                        applyDoorDesignToAll: 'Apply door design to all doors',
                    },
                    title: {
                        newDesignDialog: 'New wardrobe design?',
                        newDesignLoaderError: 'Data loading error!',
                        newDesignLoaderLoading: 'Loading data...',
                        sendDesignDialog: 'Send design for price calculations',
                    },
                    text: {
                        newDesignDialog1: 'Confirm new design by clicking "Confirm" button.',
                        newDesignDialog2: 'Attention! Current design will be erased.',
                    },
                    label: {
                        selectLanguage: 'Select language:',
                        selectCorpusMaterial: 'Select corpus material',
                        selectIronWorkMaterial: 'Select ironwork material',
                        selectPhotoWallpaper: 'Select photo wallpaper',
                        selectSection: 'Select section layout',
                        selectDoor: 'Select door type',
                        selectDoorPartMaterial: 'Select door part material',
                        setDimensions: 'Set wardrobe dimensions',
                        wardrobeWidth: 'Wardrobe width',
                        wardrobeHeight: 'Wardrobe height',
                        wardrobeDepth: 'Wardrobe depth',
                        none: 'None',
                        aluminium: 'Aluminium',
                        steel: 'Steel',
                        iron: "Iron",
                        wood: "Wood",
                        lacobel: "Lacobel",
                        mirror: "Mirror",
                        glass: "Glass",
                        nameAndSurname: 'Your name',
                        email: 'Your contact email',
                        phone: 'Your contact phone',
                        assemblyPlace: 'Assembly place',
                        comment: 'Extra comment',
                        summary: 'Wardrobe summary',
                        summaryDimensions: 'Dimensions:',
                        summarySectionsCount: 'Sections count:',
                        summarySectionWidth: 'Section width:',
                        summarySections: 'Chosen sections:',
                        summaryDoorsCount: 'Doors count:',
                        summaryDoorWidth: 'Door width:',
                        summaryDoors: 'Chosen doors and door parts:',
                        summaryYes: 'Yes',
                        summaryNo: 'No',
                        summaryLeftSidePartition: 'Left side partition:',
                        summaryRightSidePartition: 'Right side partition:',
                        summaryCorpusMaterial: 'Corpus material:',
                        summaryIronWorkMaterial: 'IronWorks material:',
                        summaryPhotoWallpaper: 'Photo wallpaper:',
                    },
                    message: {
                        error: 'Error!',
                    },
                    languages: {
                        sk: 'Slovak',
                        gb: 'English',
                    },
                }
            },
            sk: {
                translation: {
                    button: {
                        close: 'Zatvoriť',
                        button: 'Tlačidlo',
                        confirm: 'Potvrdiť',
                        cancel: 'Zrušiť',
                        error: 'Chyba',
                        shadows: 'Tiene',
                        send: 'Odoslať na nezáväzné nacenenie',
                        sendDesign: 'Odoslať',
                        preview: 'Náhľad',
                        wardrobeSettings: 'Nastavenia skrine',
                        newDesign: 'Nový návrh',
                        dimensions: 'Rozmery',
                        corpusMaterial: 'Materiál korpusu',
                        ironworks: 'Materiál kovania',
                        leftPartition: 'Stena zľava',
                        rightPartition: 'Stena zprava',
                        removeSection: 'Odobrať sekciu',
                        addSection: 'Pridať sekciu',
                        removeDoor: 'Odobrať dvere',
                        addDoor: 'Pridať dvere',
                        editWardrobe: 'Úprava skine',
                        editSections: 'Úprava sekcií',
                        editDoors: 'Úprava dvier',
                        editDoorsParts: 'Úprava výplní dvier',
                        changePhotoWallpaper: 'Zmena fototapety',
                        applySelectedSectionToAll: 'Aplikovať rozvrhnutie na všetky sekcie',
                        applySelectedDoorToAll: 'Aplikovať vybraný typ na všetky dvere',
                        applySelectedPhotoWallpaperToAll: 'Aplikovať fototapetu na všetky časti dvier',
                        applyMaterialToSelectedDoor: 'Aplikovať materiál na celé dvere',
                        applyDoorDesignToAll: 'Aplikovať návrh dvier na všetky dvere',
                    },
                    title: {
                        newDesignDialog: 'Vytvoriť novy návrh?',
                        newDesignLoaderError: 'Chyba pri načítaní dát!',
                        newDesignLoaderLoading: 'Načítavam dáta...',
                        sendDesignDialog: 'Odoslať návrh na nezáväzné nacenenie',
                    },
                    text: {
                        newDesignDialog1: 'Potvrďte vytvorenie nového návrhu stlačením tlačídla "Potvrdiť".',
                        newDesignDialog2: 'Pozor! Aktuálny návrh bude zmazaný.',
                    },
                    label: {
                        selectLanguage: 'Vyberte jazyk:',
                        selectCorpusMaterial: 'Vyberte materiál korpusu',
                        selectIronWorkMaterial: 'Vyberte materiál kovania',
                        selectPhotoWallpaper: 'Vyberte fototapetu',
                        selectSection: 'Vyberte rozvrhnutie sekcie',
                        selectDoor: 'Vyberte typ dvier',
                        selectDoorPartMaterial: 'Vyberte materiál pre panel dverí',
                        setDimensions: 'Nastavte rozmery skrine',
                        wardrobeWidth: 'Šírka skrine',
                        wardrobeHeight: 'Výška skrine',
                        wardrobeDepth: 'Hĺbka skrine',
                        none: 'Žiaden',
                        aluminium: 'Hliník',
                        steel: 'Oceľ',
                        iron: "Železo",
                        wood: "Drevo",
                        lacobel: "Lakobel",
                        mirror: "Zrkadlo",
                        glass: "Sklo",
                        nameAndSurname: 'Vaše meno',
                        email: 'Váš kontaktný email',
                        phone: 'Váš kontaktný telefón',
                        assemblyPlace: 'Miesto montáže',
                        comment: 'Vaše poznámky/komentáre',
                        summary: 'Sumár',
                        summaryDimensions: 'Rozmery:',
                        summarySectionsCount: 'Počet sekcií:',
                        summarySectionWidth: 'Šírka sekcie:',
                        summarySections: 'Vybrané typy sekcií:',
                        summaryDoorsCount: 'Počet dvier:',
                        summaryDoorWidth: 'Šírka dvier:',
                        summaryDoors: 'Vybraný typy dvier a výplní:',
                        summaryYes: 'Áno',
                        summaryNo: 'Nie',
                        summaryLeftSidePartition: 'Doska z ľavej strany:',
                        summaryRightSidePartition: 'Doska z pravej strany:',
                        summaryCorpusMaterial: 'Materiál korpusu:',
                        summaryIronWorkMaterial: 'Materiál kovania:',
                        summaryPhotoWallpaper: 'Fototapeta:',
                    },
                    message: {
                        error: 'Chyba!',
                    },
                    languages: {
                        sk: 'Slovensky',
                        gb: 'Anglicky',
                    },
                }
            }
        }
    });