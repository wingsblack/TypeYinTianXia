declare class xwz {
    static apply(source: Object, copy: Object): Object;
    static isArray(obj): boolean;
    static EmptyFn: Function;
}

declare module art {
  
    interface IDialog {
        open(url, obj);
        (obj: any): IDialog;
    }

    var dialog: IDialog;
   
}

declare module xwz {
    interface ISocketListen {
        API: string,
        onMessage(message: any);
    }
}

declare class SockJS {
    constructor(url: String);
}

declare class Stomp {
    static over(socket: SockJS): any;
}

declare interface IfindPwdAlertDiv {
    hide();
    show();
}

declare var findPwdAlertDiv: IfindPwdAlertDiv;

declare function daojishi2(a: any);


declare interface IUE {
    getEditor(...par: any[]);
}

declare var UE: IUE;
declare var su: any;