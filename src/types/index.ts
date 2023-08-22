import { Component } from "vue";

export interface Tabs {
    key: number;
    title: string;
    icon: string;
    component: Component;
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
    requests: string[];
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
  