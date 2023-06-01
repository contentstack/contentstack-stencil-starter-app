import { Image, Link } from "./action"

export type FooterRes= {
  uid: string
  title: string
  copyright: string
  logo: Image
  navigation: {
    link: Link[]
  }
  social: {
    social_share: {
      icon: Image
      link: Link
    }[]
  }
}

export type HeaderRes= {
  title: string
  uid: string
  logo: Image
  navigation_menu: {
    label: string
    page_reference: {
      title: string
      url: string
    }[]
  }[]
  notification_bar: {
    show_announcement: boolean
    announcement_text: string
  }
}