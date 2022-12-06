type AdditionalParam = {
    url: string;
    title: {};
    href: string;
  }
  
export type Action = {
    title: string;
    href: string;
    $: AdditionalParam;
}
  
export type Image = {
    filename: string;
    url: string;
    title: string;
    $: AdditionalParam;
}