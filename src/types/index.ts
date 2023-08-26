import { Component } from "vue";

export interface Tabs {
    key: number;
    title: string;
    icon: string;
    component: Component;
}

export interface Language {
  title: string;
  id: string;
}

export interface Setting {
  notification: boolean;
  language: string | 'id' | 'en';
  wallpaper: string;
}
export interface User {
    name: {
      first: string;
      last?: string;
    };
    avatar: string;
    username: string;
    active: boolean;
    bio: string;
    email: string;
    phone: string;
    freinds: string[];
    setting: Setting;
  }
  
  interface MessageBody {
    text: string;
    image: string;
  }
  
  export interface Message {
    body: MessageBody;
    from: string;
    to: string;
    formself?: boolean;
  }
  