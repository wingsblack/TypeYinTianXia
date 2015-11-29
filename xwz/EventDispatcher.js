var xwz;
(function (xwz) {
    var EventDispatcher = (function () {
        function EventDispatcher() {
            /**
              * 事件抛出对象
              */
            this._eventTarget = null;
            /**
             * 引擎内部调用
             * @private
             */
            this._eventsMap = null;
        }
        /**
         * 添加事件侦听器
         * @method egret.EventDispatcher#addEventListener
         * @param type {string} 事件的类型。
         * @param listener {Function} 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
          */
        EventDispatcher.prototype.addEventListener = function (type, listener) {
            this.on(type, listener);
        };
        /**
         * 添加事件侦听器
         * @method egret.EventDispatcher#addEventListener
         * @param type {string} 事件的类型。
         * @param listener {Function} 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
          */
        EventDispatcher.prototype.on = function (type, listener) {
            var eventMap;
            if (!this._eventsMap)
                this._eventsMap = {};
            eventMap = this._eventsMap;
            var list = eventMap[type];
            if (!list) {
                list = eventMap[type] = [];
            }
            list.push({
                listener: listener
            });
        };
        EventDispatcher.prototype.removeEventListener = function (type, listener) {
            var eventMap = this._eventsMap;
            if (!eventMap)
                return;
            var list = eventMap[type];
            if (!list) {
                return;
            }
            var index = list.indexOf(listener);
            if (index != -1) {
                list.splice(index, 1);
            }
        };
        /**
         * 将事件分派到事件流中。事件目标是对其调用 dispatchEvent() 方法的 EventDispatcher 对象。
         * @method egret.EventDispatcher#dispatchEvent
         * @param event {egret.Event} 调度到事件流中的 Event 对象。如果正在重新分派事件，则会自动创建此事件的一个克隆。 在调度了事件后，其 _eventTarget 属性将无法更改，因此您必须创建此事件的一个新副本以能够重新调度。
         * @returns {boolean} 如果成功调度了事件，则值为 true。值 false 表示失败或对事件调用了 preventDefault()。
         */
        EventDispatcher.prototype.dispatchEvent = function (event) {
            var eventMap = this._eventsMap;
            if (!eventMap)
                return;
            var list = eventMap[event.type];
            if (!list)
                return;
            for (var i = 0; i < list.length; i++) {
                var tmp = list[i];
                var result = tmp.listener();
                if (result === false)
                    break;
            }
        };
        return EventDispatcher;
    })();
    xwz.EventDispatcher = EventDispatcher;
})(xwz || (xwz = {}));
//# sourceMappingURL=EventDispatcher.js.map