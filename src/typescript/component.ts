import { Action, Image } from "./action";

type Employee = {
  image: Image;
  name: string;
  designation: string;
  $: Employee;
}

export type BucketList = {
    title_h3: string;
    description: string;
    url: string;
    call_to_action: Action;
    icon: Image;
    $: BucketList;
}

export type Card = {
  cards: [CardData]
}

export type CardData = {
  title_h3: string,
  description: string,
  call_to_action: Action,
  $: CardData
}

type Article = {
  href: string;
  title: string;
  $: Article;
}

type FeaturedBlog = [
  BlogArray: {
    title: string;
    featured_image: Image;
    body: string;
    url: string;
    $: {
      title:string;
      featured_image:Image;
      body:string;
      url:string;
    };
  }
]

export type Widget = {
  title_h2: string;
  type?: string;
  $: Widget;
}

export type Component = {
  hero_banner: Banner | null;
  section: SectionProps | null;
  section_with_buckets: SectionWithBucket | null;
  from_blog: FeaturedBlogData | null;
  section_with_cards: Card | null;
  section_with_html_code: ObjectProps | null;
  our_team: TeamProps | null;
  widget: Widget | null;
}

export type SectionWithBucket = {
    bucket_tabular: boolean
    title_h2: string;
    buckets: BucketList[];
    description: string;
    $: SectionWithBucket;
  }
  
export type Banner = {
    banner_title:string;
    banner_description: string;
    bg_color: string;
    call_to_action: Action;
    banner_image: Image;
    text_color: string;
    $: Banner;
  }
  
export type ObjectProps = {
    html_code_alignment: string;
    title: string;
    $: ObjectProps;
    description: string;
    html_code: string;
  }
  
export type SectionProps = {
    title_h2: string;
    description: string;
    call_to_action: Action;
    image: Image;
    image_alignment: string;
    $: SectionProps;
  } 
  
export type TeamProps = {
    title_h2: string;
    description: string;
    $: TeamProps;
    employees: [Employee];
  }
  
export type FeaturedBlogData = {
    title_h2: string;
    view_articles: Article;
    featured_blogs: FeaturedBlog;
    $: FeaturedBlogData;
}

export type RenderProps = {
  blogsPage?: boolean;
  contentTypeUid: string;
  entryUid: string;
  locale: string;
  pageComponents:Component[];
}