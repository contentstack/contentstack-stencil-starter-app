import { Image } from "./action";
import { Component } from "../typescript/component";

type AdditionalParam = {
    title: string;
    copyright: string;
    announcement_text: string;
    label: {};
    url: string;
    body: string;
    href: string;
  }
  
type EntryData = {
    title: string;
    url: string;
    $: AdditionalParam;
  }

type Navigation = {
    link: [Links]
  }

export type HeaderMenu = {
    label?: string;
    page_reference: [PageRef];
    $: {};
    href?: string;
}

type PageRef = {
    title: string;
    url: string;
    $: AdditionalParam;
  }

type Author = {
    title: string;
    $: AdditionalParam;
  }
  
type Blog = {
    url: string;
    body: string;
    title: string;
    $: AdditionalParam;
  }
  
export type Posts = {
    locale?: string;
    author: [Author];
    body: string;
    date: string;
    featured_image?: {};
    is_archived: boolean;
    related_post: [Blog];
    seo?: {};
    url?:string;
    title: string;
    _owner?: {};
    $: AdditionalParam;
  }
  
export type Links = {
    label?: string;
    title: string;
    href: string;
    $?:AdditionalParam;
  }
  
export type Menu = {
    title: string;
    href: string;
    label: string;
    page_reference: [PageRef]
    $: AdditionalParam
  }
  
export type Social = {
    link: Links;
    icon: Image;
  }
  
export type Entry = [
    entry: EntryData
  ]

export type FooterProps = {
    navigation: Navigation;
  }

export type HeaderProps = {
    navigation_menu: [HeaderMenu];
  }

export type DispatchData = {
    dispatch: Function;
  }

export type PageProps = {
    locale: string;
    page_components: Component[];
    uid: string;
    url: string;
    title: string;
    seo: {};
  }