import { Loading, LoadingController, Toast, ToastController } from 'ionic-angular';

/**
 * UI层所有公用方法的抽象类 只有抽象类才能供子类供子类继承
 * 
 * @export
 * @abstract
 * @class BaseUI
 *
 */
export abstract class BaseUI {
    constructor() { }

    /**
     * 通用的展示 loading 组件
     * 
     * @protected
     * @prama { LoadingController } loadCtrl
     * @param { string } message
     * @returns { Loading }
     * memberof BaseUI
     *
     */
    protected showLoading(loadingCtrl: LoadingController, message: string): Loading {
        let loader = loadingCtrl.create({
            content: message, //显示的内容
            dismissOnPageChange: true, //页面改变自动dismiss掉loading组件
            duration: 12000

        });
        loader.present();
        return loader;
    }

    protected showToast(toastCtrl: ToastController,message: string): Toast {
        let toast = toastCtrl.create({
             message: message,
             duration: 3000, 
             position: 'buttom',
        });
        toast.present();
        return toast;
    }

}