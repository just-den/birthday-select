/* * * * * * * * * * * * * * * * * * * * * * *
 * birthday-select.js v1.0.0
 * https://github.com/just-den/birthday-select.git
 * Denis Zatishnyi (c) 2019
 * * * * * * * * * * * * * * * * * * * * * * */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.dateSelect = factory(root);
    }
})(typeof global !== 'undefined' ? global : window || this.window || this.global, function(root) {

    /**
     * constructor
     * @private
     * @param {Object} options User options
     */
    const $dateSelect = function(options) {
        this.settings = extend(baseSettings, getSettings(options))
    }

    // localization settings
    const local = {
        "en": {
            base: {
                day: "Day",
                month: "Month",
                year: "Year"
            },
            month: [{
                    name: "January"
                },
                {
                    name: "February"
                },
                {
                    name: "March"
                },
                {
                    name: "April"
                },
                {
                    name: "May"
                },
                {
                    name: "June"
                },
                {
                    name: "July"
                },
                {
                    name: "August"
                },
                {
                    name: "September"
                },
                {
                    name: "October"
                },
                {
                    name: "November"
                },
                {
                    name: "December"
                }
            ]
        },
        "ru": {
            base: {
                day: "День",
                month: "Месяц",
                year: "Год"
            },
            month: [{
                    name: "Январь"
                },
                {
                    name: "Февраль"
                },
                {
                    name: "Март"
                },
                {
                    name: "Апрель"
                },
                {
                    name: "Май"
                },
                {
                    name: "Июнь"
                },
                {
                    name: "Июль"
                },
                {
                    name: "Август"
                },
                {
                    name: "Сентябрь"
                },
                {
                    name: "Октябрь"
                },
                {
                    name: "Ноябрь"
                },
                {
                    name: "Декабрь"
                }
            ]
        },
        "de": {
            base: {
                day: "Tag",
                month: "Monat",
                year: "Jahr"
            },
            month: [{
                    name: "Januar"
                },
                {
                    name: "Februar"
                },
                {
                    name: "März"
                },
                {
                    name: "April"
                },
                {
                    name: "Mai"
                },
                {
                    name: "Juni"
                },
                {
                    name: "Juli"
                },
                {
                    name: "August"
                },
                {
                    name: "September"
                },
                {
                    name: "Oktober"
                },
                {
                    name: "November"
                },
                {
                    name: "Dezember"
                }
            ]
        }
    }

    // base plugin settings
    const baseSettings = {
        day: local["en"]["base"]["day"],
        month: local["en"]["base"]["month"],
        year: local["en"]["base"]["year"],
        days: [],
        months: local["en"]["month"],
        years: []
    }

    // defaults settings
    const defaults = {
        id: null,
        minYear: 1900,
        maxYear: new Date().getFullYear(),
        bootstrap: false,
        labels: [],
        lang: 'en'
    }

    /**
     * A simple forEach() implementation for Arrays, Objects and NodeLists
     * @private
     * @param {Array|Object|NodeList} collection Collection of items to iterate
     * @param {Function} callback Callback function for each iteration
     * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
     */
    function forEach(collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === '[object Object]') {
            for (let prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    callback.call(scope, collection[prop], prop, collection);
                }
            }
        } else {
            if (collection) {
                for (let i = 0, len = collection.length; i < len; i++) {
                    callback.call(scope, collection[i], i, collection);
                }
            }
        }
    };

    /**
     * Merge defaults with user options
     * @private
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     * @returns {Object} Merged values of defaults and options
     */
    function extend(defaults, options) {
        let extended = {};
        forEach(defaults, function(value, prop) {
            extended[prop] = defaults[prop];

        });
        forEach(options, function(value, prop) {
            extended[prop] = options[prop];

        });
        return extended;
    };

     /**
     * Days data initialization
     * @private
     * @param {Object/Boolean/String} disabledDataArray Set option DOM element is disabled ( day is unavailable ) 
     */   
    function daysInit(disabledDataArray) {
        let days = []
        for (let i = 1; i <= 31; i++) {

            let o = {}

            if (i <= 9) {
                o.index = '0' + i
            } else {
                o.index = i.toString()
            }

            if (disabledDataArray) {
                o.disabled = disabledDataArray.indexOf(o.index) === -1
            } else {
                o.disabled = false
            }

            days.push(o)
        }
        this.settings.days = days
    }

     /**
     * Insert days data in DOM element
     * @private
     * @param {Object} select DOM element
     */ 
    function daysLayout(select) {
        removeChildren(select)
        const first = new Option(this.settings.day, '', true, true)
        first.disabled = 'disabled'
        select.add(first)
        this.settings.days.forEach((day) => {
            const option = new Option(day.index, day.index)
            if (day.disabled) {
                option.disabled = 'disabled'
            }
            select.add(option)
        })
    }

     /**
     * Days data initialization
     * @private
     * @param {Object/Boolean/String} disabledDataArray Set option DOM element is disabled ( month is unavailable ) 
     */ 
    function monthsInit(disabledDataArray) {
        let months = []

        this.settings.months.forEach((month, i) => {
            i++
            let o = {}
            if (i <= 9) {
                o.index = '0' + i
            } else {
                o.index = i.toString()
            }
            o.name = month.name
            if (disabledDataArray) {
                o.disabled = disabledDataArray.indexOf(o.index) !== -1
            } else {
                o.disabled = false
            }
            months.push(o)
        })
        this.settings.months = months
    }

     /**
     * Insert month data in DOM element
     * @private
     * @param {Object} select DOM element
     */ 
    function monthsLayout(select) {
        removeChildren(select)
        const first = new Option(this.settings.month, '', true, true)
        first.disabled = 'disabled'
        select.add(first)
        this.settings.months.forEach((month) => {
            const option = new Option(month.name, month.index)
            if (month.disabled) {
                option.disabled = 'disabled'
            }
            select.add(option)
        })
    }

     /**
     * Days data initialization
     * @private
     * @param {Object/Boolean/String} disabledDataArray Set option DOM element is disabled ( year is unavailable ) 
     */ 
    function yearsInit(leap) {
        const start = Number(this.settings.minYear)
        const end = Number(this.settings.maxYear)
        let i = end
        let years = []
        while (i >= start) {
            let o = {}
            o.index = i
            if (leap) {
                o.disabled = ((i % 4) || (!(i % 100) && (i % 400)))
            } else {
                o.disabled = false
            }
            years.push(o)
            i--
        }
        this.settings.years = years
    }

     /**
     * Insert year data in DOM element
     * @private
     * @param {Object} select DOM element
     */ 
    function yearsLayout(select) {
        removeChildren(select)
        const first = new Option(this.settings.year, '', true, true)
        first.disabled = 'disabled'
        select.add(first)
        this.settings.years.forEach((year) => {
            const option = new Option(year.index, year.index)
            if (year.disabled) {
                option.disabled = 'disabled'
            }
            select.add(option)
        })
    }

     /**
     * Unique Id
     * @private
     * @returns {String} Returns pseudo unique id
     */ 
    const uniqueId = () => ('_' + Math.random().toString(36).substr(2, 9))

    const removeChildren = (el) => {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

     /**
     * Set default plugin settings according to users prefernces
     * @private
     * @param {Object} options Users settings
     * @returns {Object} New plugin settings
     */ 
    function setSettings(options) {
        if (typeof options === 'object') {
            for (let prop in options) {
                if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                    defaults[prop] = options[prop]
                }
            }
        }
        return defaults
    }

     /**
     * Get new plugin settings
     * @private
     * @param {Object} options Users settings
     * @returns {Object} New plugin settings
     */ 
    function getSettings(options) {
        return setSettings(options)
    }

     /**
     * Initialization new instance of a plugin object ( fro new DOM element )
     * @public
     */
    $dateSelect.prototype.init = function() {

        daysInit.call(this, null)
        monthsInit.call(this, null)
        yearsInit.call(this, null)

        try {
            if (this.settings.id) {

                // lang
                if (local.hasOwnProperty(this.settings.lang)) {
                    this.settings.day = local[this.settings.lang]["base"]["day"]
                    this.settings.month = local[this.settings.lang]["base"]["month"]
                    this.settings.year = local[this.settings.lang]["base"]["year"]
                    this.settings.months = local[this.settings.lang]["month"]
                }
                console.log('this.settings.month: ', this.settings.month)
                const id = document.querySelector(this.settings.id)

                const selectDay = document.createElement('select')
                console.log('selectDay: ',typeof selectDay)
                daysLayout.call(this, selectDay)
                selectDay.addEventListener('change', (e) => {

                    const _this = e.currentTarget
                    if (_this.value >= '1' && _this.value <= '29') {

                        monthsInit.call(this, null)
                    } else if (_this.value === '30') {
                        const disabled = ['02']
                        monthsLayout.call(this, selectMonth)
                    } else if (_this.value === '31') {
                        const disabled = ['02', '04', '06', '09', '11']
                        monthsInit.call(this, disabled)
                    }
                    monthsLayout.call(this, selectMonth)
                }, false)

                const selectMonth = document.createElement('select')
                monthsLayout.call(this, selectMonth)
                selectMonth.addEventListener('change', (e) => {
                    const _this = e.currentTarget
                    yearsInit.call(this, null)
                    if (selectDay.selectedIndex === 29 && _this.value === '02') {
                        yearsInit.call(this, 'leap')
                    }
                    yearsLayout.call(this, selectYear)
                }, false)

                const selectYear = document.createElement('select')
                yearsLayout.call(this, selectYear)

                if (this.settings.labels && this.settings.labels.length > 0 || this.settings.bootstrap) {
                    const wrapperDay = document.createElement('div')
                    if (this.settings.labels[0]) {
                        const uniqueIdDay = uniqueId()
                        const labelDay = document.createElement('label')
                        labelDay.innerHTML = this.settings.labels[0]
                        labelDay.for = uniqueIdDay
                        selectDay.id = uniqueIdDay
                        wrapperDay.appendChild(labelDay)
                    }
                    if (this.settings.bootstrap) {
                        wrapperDay.className = 'form-group'
                        selectDay.className = 'custom-select'
                        selectDay.required = 'required'
                    }
                    wrapperDay.appendChild(selectDay)

                    const wrapperMonth = document.createElement('div')
                    if (this.settings.labels[1]) {
                        const uniqueIdMonth = uniqueId()
                        const labelMonth = document.createElement('label')
                        labelMonth.innerHTML = this.settings.labels[1]
                        labelMonth.for = uniqueIdMonth
                        selectMonth.id = uniqueIdMonth
                        wrapperMonth.appendChild(labelMonth)
                    }
                    if (this.settings.bootstrap) {
                        wrapperMonth.className = 'form-group'
                        selectMonth.className = 'custom-select'
                        selectMonth.required = 'required'
                    }
                    wrapperMonth.appendChild(selectMonth)

                    const wrapperYear = document.createElement('div')
                    if (this.settings.labels[2]) {
                        const uniqueIdYear = uniqueId()
                        const labelYear = document.createElement('label')
                        labelYear.innerHTML = this.settings.labels[2]
                        labelYear.for = uniqueIdYear
                        selectYear.id = uniqueIdYear
                        wrapperYear.appendChild(labelYear)
                    }
                    if (this.settings.bootstrap) {
                        wrapperYear.className = 'form-group'
                        selectYear.className = 'custom-select'
                        selectYear.required = 'required'
                    }
                    wrapperYear.appendChild(selectYear)

                    id.appendChild(wrapperDay)
                    id.appendChild(wrapperMonth)
                    id.appendChild(wrapperYear)
                } else {
                    id.appendChild(selectDay)
                    id.appendChild(selectMonth)
                    id.appendChild(selectYear)
                }


            }
        } catch (e) {
            console.log('ERROR: ', e)
        }

    }

    return $dateSelect;
});