interface IExtraField{
    name?: string;
    value?: string;
    inline?: boolean;
}

export interface IEmbedArgs {
    contents?: string;
    title?: string;
    footer?: string;
    footerImage?: string;
    author?: string;
    url?: string;
    image?: string;
    thumbnail?: string;
    extraFields?: Array<IExtraField>;
}
