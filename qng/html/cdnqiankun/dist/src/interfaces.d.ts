/**
 * @author kuitos
 * @since 2019-05-16
 */
import type { ImportEntryOpts } from 'import-html-entry';
import type { RegisterApplicationConfig, StartOpts, Parcel } from 'single-spa';
declare global {
    interface Window {
        __POWERED_BY_QIANKUN__?: boolean;
        __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
        __QIANKUN_DEVELOPMENT__?: boolean;
        Zone?: CallableFunction;
        __zone_symbol__setTimeout?: Window['setTimeout'];
    }
}
export type ObjectType = Record<string, any>;
export type Entry = string | {
    scripts?: string[];
    styles?: string[];
    html?: string;
};
export type HTMLContentRender = (props: {
    appContent: string;
    loading: boolean;
}) => any;
export type AppMetadata = {
    name: string;
    entry: Entry;
};
export type LoadableApp<T extends ObjectType> = AppMetadata & {
    props?: T;
} & ({
    render: HTMLContentRender;
} | {
    container: string | HTMLElement;
});
export type RegistrableApp<T extends ObjectType> = LoadableApp<T> & {
    loader?: (loading: boolean) => void;
    activeRule: RegisterApplicationConfig['activeWhen'];
};
export type PrefetchStrategy = boolean | 'all' | string[] | ((apps: AppMetadata[]) => {
    criticalAppNames: string[];
    minorAppsName: string[];
});
type QiankunSpecialOpts = {
    /**
     * @deprecated internal api, don't used it as normal, might be removed after next version
     */
    $$cacheLifecycleByAppName?: boolean;
    prefetch?: PrefetchStrategy;
    sandbox?: boolean | {
        strictStyleIsolation?: boolean;
        experimentalStyleIsolation?: boolean;
        /**
         * @deprecated We use strict mode by default
         */
        loose?: boolean;
        /**
         * use speed sandbox mode, enabled by default from 2.9.0
         */
        speedy?: boolean;
        patchers?: Patcher[];
    };
    singular?: boolean | ((app: LoadableApp<any>) => Promise<boolean>);
    /**
     * skip some scripts or links intercept, like JSONP
     */
    excludeAssetFilter?: (url: string) => boolean;
    globalContext?: typeof window;
};
export type FrameworkConfiguration = QiankunSpecialOpts & ImportEntryOpts & StartOpts;
export type LifeCycleFn<T extends ObjectType> = (app: LoadableApp<T>, global: typeof window) => Promise<any>;
export type FrameworkLifeCycles<T extends ObjectType> = {
    beforeLoad?: LifeCycleFn<T> | Array<LifeCycleFn<T>>;
    beforeMount?: LifeCycleFn<T> | Array<LifeCycleFn<T>>;
    afterMount?: LifeCycleFn<T> | Array<LifeCycleFn<T>>;
    beforeUnmount?: LifeCycleFn<T> | Array<LifeCycleFn<T>>;
    afterUnmount?: LifeCycleFn<T> | Array<LifeCycleFn<T>>;
};
export type MicroApp = Parcel;
export type Rebuilder = () => void;
export type Freer = () => Rebuilder;
export type Patcher = () => Freer;
export declare enum SandBoxType {
    Proxy = "Proxy",
    Snapshot = "Snapshot",
    LegacyProxy = "LegacyProxy"
}
export type SandBox = {
    /** 沙箱的名字 */
    name: string;
    /** 沙箱的类型 */
    type: SandBoxType;
    /** 沙箱导出的代理实体 */
    proxy: WindowProxy;
    /** 沙箱是否在运行中 */
    sandboxRunning: boolean;
    /** latest set property */
    latestSetProp?: PropertyKey | null;
    patchDocument: (doc: Document) => void;
    /** 启动沙箱 */
    active: () => void;
    /** 关闭沙箱 */
    inactive: () => void;
};
export type OnGlobalStateChangeCallback = (state: Record<string, any>, prevState: Record<string, any>) => void;
export type MicroAppStateActions = {
    onGlobalStateChange: (callback: OnGlobalStateChangeCallback, fireImmediately?: boolean) => void;
    setGlobalState: (state: Record<string, any>) => boolean;
    offGlobalStateChange: () => boolean;
};
export {};
