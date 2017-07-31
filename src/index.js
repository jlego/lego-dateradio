/**
 * 视图类: 长期或自定义时间段组件
 * 作者: yuronghui
 * 创建日期: 2017/6/6
 */
import './asset/index.scss';

class View extends Lego.UI.Baseview {
    constructor(opts = {}) {
        const options = {
            typeValue: 0,
            startValue: '',
            endValue: '',
            minDate: '',
            maxDate: '',
            format: 'YYYY-MM-DD HH:mm:ss',
            onChange(){}
        };
        Object.assign(options, opts);
        super(options);
    }
    components(){
        let opts = this.options,
            that = this;
        this.result = this.result || {};
        this.addCom([{
            el: '#chkgroup_' + opts.vid,
            type: 'radio',
            // layout: 'inline',
            name: 'hidden_type_' + opts.vid,
            data: [{
                label: '长期',
                value: '0',
                checked: !opts.typeValue
            }, {
                label: '自定义',
                value: '1',
                checked: opts.typeValue
            }],
            onChange(self, result){
                let datepickerView = Lego.getView('#datepicker_' + opts.vid);
                if(datepickerView){
                    if(parseInt(result.value)){
                        datepickerView.$el.show();
                    }else{
                        datepickerView.$el.hide();
                    }
                }
                that.result = {type: result.value};
                if(typeof opts.onChange == 'function') opts.onChange(that, that.result);
            }
        }, {
            el: '#datepicker_' + opts.vid,
            type: 'range',
            showClose: true,
            showClear: true,
            startName: 'hidden_start_' + opts.vid,
            endName: 'hidden_end_' + opts.vid,
            startValue: opts.startValue,
            endValue: opts.endValue,
            minDate: opts.minDate,
            maxDate: opts.maxDate,
            format: opts.format,
            style: {
                display: 'none'
            },
            onChange(self, result, type) {
                that.result[type + 'Date'] = result;
                if(typeof opts.onChange == 'function') opts.onChange(that, that.result);
            }
        }]);
    }
    render() {
        let opts = this.options;
        return hx`<div class="lego-dateradio">
            <chkgroup id="chkgroup_${opts.vid}"></chkgroup>
            <datepicker id="datepicker_${opts.vid}"></datepicker>
        </div>`;
    }
    getValue(){
        return this.result;
    }
}
Lego.components('dateradio', View);
export default View;
