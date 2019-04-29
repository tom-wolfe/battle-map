import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type } from '@angular/core';

@Injectable()
export class ComponentFactory {
  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  create<T>(component: Type<T>): ComponentRef<T> {
    const ref = this.factoryResolver.resolveComponentFactory<T>(component).create(this.injector);
    this.appRef.attachView(ref.hostView);
    return ref;
  }

  destroy<T>(componentRef: ComponentRef<T>) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}