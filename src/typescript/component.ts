import { Action, Image } from "./action";

type AdditionalParam = {
  title: {};
  title_h2: {};
  title_h3: string;
  description: string;
  banner_title: string;
  banner_description: string;
  designation: string;
  name: string;
  html_code: string;
  body: {};
  href: string;
}

type Employee = {
  image: Image;
  name: string;
  designation: string;
  $: AdditionalParam;
}

export type BucketList = [
  BucketArray:{
    title_h3: string;
    description: string;
    url: string;
    call_to_action: Action;
    icon: Image;
    $: AdditionalParam;
  }
]

export type Card = {
  cards: [CardData]
}

export type CardData = {
  title_h3: string,
  description: string,
  call_to_action: Action,
  $: AdditionalParam
}

type Article = {
  href: string;
  title: string;
  $: AdditionalParam;
}

type FeaturedBlog = [
  BlogArray: {
    title: string;
    featured_image: Image;
    body: string;
    url: string;
    $: AdditionalParam;
  }
]

export type Widget = {
  title_h2: string;
  type?: string;
  $: AdditionalParam;
}

export type Component = {
  hero_banner: Banner;
  section: SectionProps;
  section_with_buckets: SectionWithBucket;
  from_blog: FeaturedBlogData;
  section_with_cards: Card;
  section_with_html_code: ObjectProps;
  our_team: TeamProps;
  widget: Widget;
}

export type SectionWithBucket = {
    bucket_tabular: boolean
    title_h2: string;
    buckets: BucketList;
    description: string;
    $: AdditionalParam;
  }
  
export type Banner = {
    banner_title:string;
    banner_description: string;
    bg_color: string;
    call_to_action: Action;
    banner_image: Image;
    text_color: string;
    $: AdditionalParam;
  }
  
export type ObjectProps = {
    html_code_alignment: string;
    title: string;
    $: AdditionalParam;
    description: string;
    html_code: string;
  }
  
export type SectionProps = {
    title_h2: string;
    description: string;
    call_to_action: Action;
    image: Image;
    image_alignment: string;
    $: AdditionalParam;
  } 
  
export type TeamProps = {
    title_h2: string;
    description: string;
    $: AdditionalParam;
    employees: [Employee];
  }
  
export type FeaturedBlogData = {
    title_h2: string;
    view_articles: Article;
    featured_blogs: FeaturedBlog;
    $: AdditionalParam;
}

export type RenderProps = {
  blogsPage?: boolean;
  contentTypeUid: string;
  entryUid: string;
  locale: string;
  pageComponents:Component[];
}