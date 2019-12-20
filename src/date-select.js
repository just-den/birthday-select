/* * * * * * * * * * * * * * * * * * * * * * *
 * birthday-select.js v1.0.0
 * https://github.com/just-den/birthday-select.git
 * Denis Zatishnyi (c) 2019
 * * * * * * * * * * * * * * * * * * * * * * */

(function (root, factory) {
	if(typeof define === 'function' && define.amd) {
		define([], factory(root));
	} else if(typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		root.dateSelect = factory(root);
	}
})(typeof global !== 'undefined' ? global : window || this.window || this.global, function (root) {

	'use strict';

	const $dateSelect = Object.create(null)

	let settings = {
		daySelected: 'day',
		monthSelected: 'month',
		yearSelected: 'year',
		days: [],
		months: [
			{ name: "January"},
			{ name: "February"},
			{ name: "March"},
			{ name: "April"},
			{ name: "May"},
			{ name: "June"},
			{ name: "July"},
			{ name: "August"},
			{ name: "September"},
			{ name: "October"},
			{ name: "November"},
			{ name: "December"}
		],
		years: []
	}


	const defaults = {
		id: null,
		minYear: 1900,
		maxYear: new Date().getFullYear(),
		bootstrap: false,
		labels: []
	}

	const daysInit = (disabledDataArray) => {
		let days = []
		for (let i = 1; i <= 31; i++) {

			let o = {}

			if (i <= 9) {
				o.index = '0' + i
			} else {
				o.index = i.toString()
			}
		
			if( disabledDataArray ){			
				o.disabled = disabledDataArray.indexOf(o.index) === -1		
			}else{			
				o.disabled = false	
			}			

			days.push(o)
		}
		settings.days = days
	}

	const daysLayout = (select) => {
		removeChildren(select)
		const first = new Option('Day','',true,true)
		first.disabled = 'disabled'
		select.add(first)
		settings.days.forEach((day)=>{
			const option = new Option(day.index,day.index)
			if( day.disabled ){
				option.disabled = 'disabled'
			}
			select.add(option)
		})	
	}

	const monthsInit = (disabledDataArray) => {
		let months = []
		settings.months.forEach((month,i)=>{
			i++
			let o = {}
			if (i <= 9) {
				o.index = '0' + i
			} else {
				o.index = i.toString()
			}
			o.name = month.name
			if( disabledDataArray ){
				o.disabled = disabledDataArray.indexOf(o.index) !== -1					
			}else{			
				o.disabled = false	
			}
			months.push(o)
		})
		settings.months = months		
	}

	const monthsLayout = (select) => {
		removeChildren(select)
		const first = new Option('Month','',true,true)
		first.disabled = 'disabled'
		select.add(first)
		settings.months.forEach((month)=>{
			const option = new Option(month.name,month.index)
			if( month.disabled ){
				option.disabled = 'disabled'
			}
			select.add(option)
		})		
	}

	const yearsInit = (leap) => {
		const start = Number(settings.minYear)
		const end = Number(settings.maxYear)
		let i = end
		let years = []
		while( i >= start ){
			let o = {}
			o.index = i
			if( leap ){
				o.disabled = ((i % 4) || (!(i % 100) && (i % 400)))					
			}else{			
				o.disabled = false	
			}
			years.push(o)
			i--
		}
		settings.years = years
	}

	const yearsLayout = (select) => {
		removeChildren(select)
		const first = new Option('Month','',true,true)
		first.disabled = 'disabled'
		select.add(first)
		settings.years.forEach((year)=>{
			const option = new Option(year.index,year.index)
			if( year.disabled ){
				option.disabled = 'disabled'
			}
			select.add(option)
		})	
	}

	const uniqueId = ()  => ( '_' + Math.random().toString(36).substr(2, 9)	)	

	const removeChildren = (el) => {
		while (el.firstChild) {	
		  el.removeChild(el.firstChild);	
		}	
	}

	const setSettings = (options) => {
		if(typeof options === 'object'){
			for(let prop in options){
				if( Object.prototype.hasOwnProperty.call(defaults, prop) ){
					defaults[prop] = options[prop]
				}
			}
		}
		return {...settings, ...defaults }
	}

	const getSettings = options => setSettings(options)

	$dateSelect.init = (options) => {

		settings = getSettings(options)

		daysInit(null)	
		monthsInit(null)
		yearsInit(null)

		try{
			if(settings.id){

				const id = document.querySelector(settings.id)

				const selectDay = document.createElement('select')
				daysLayout(selectDay)
				selectDay.addEventListener('change',(e)=>{
					const _this = e.currentTarget
					if( _this.value >='1' && _this.value <='29' ){
						monthsInit(null)
					}else if( _this.value === '30' ){
						const disabled = ['02']
						monthsLayout(selectMonth)
					}else if( _this.value === '31' ){
						const disabled = ['02','04','06','09','11']
						monthsInit(disabled)											
					}
					monthsLayout(selectMonth)	
				},false)

				const selectMonth = document.createElement('select')
				monthsLayout(selectMonth)
				selectMonth.addEventListener('change',(e)=>{
					const _this = e.currentTarget
					yearsInit(null)					
					if(selectDay.selectedIndex === 29 && _this.value === '02'){
						yearsInit('leap')
					}					
					yearsLayout(selectYear)
				},false)

				const selectYear = document.createElement('select')
				yearsLayout(selectYear)

				if( settings.labels && settings.labels.length > 0 || settings.bootstrap ){
					const wrapperDay = document.createElement('div')
					if(settings.labels[0]){
						const uniqueIdDay = uniqueId()
						const labelDay = document.createElement('label')
						labelDay.innerHTML = settings.labels[0]
						labelDay.for = uniqueIdDay
						selectDay.id = uniqueIdDay
						wrapperDay.appendChild(labelDay)
					}
					if(settings.bootstrap){
						wrapperDay.className = 'form-group'
						selectDay.className = 'custom-select'
						selectDay.required = 'required'
					}
					wrapperDay.appendChild(selectDay)

					const wrapperMonth = document.createElement('div')
					if(settings.labels[1]){
						const uniqueIdMonth = uniqueId()
						const labelMonth = document.createElement('label')
						labelMonth.innerHTML = settings.labels[1]
						labelMonth.for = uniqueIdMonth
						selectMonth.id = uniqueIdMonth
						wrapperMonth.appendChild(labelMonth)
					}
					if(settings.bootstrap){
						wrapperMonth.className = 'form-group'
						selectMonth.className = 'custom-select'
						selectMonth.required = 'required'
					}
					wrapperMonth.appendChild(selectMonth)

					const wrapperYear = document.createElement('div')
					if(settings.labels[2]){
						const uniqueIdYear = uniqueId()
						const labelYear = document.createElement('label')
						labelYear.innerHTML = settings.labels[2]
						labelYear.for = uniqueIdYear
						selectYear.id = uniqueIdYear
						wrapperYear.appendChild(labelYear)
					}
					if(settings.bootstrap){
						wrapperYear.className = 'form-group'
						selectYear.className = 'custom-select'
						selectYear.required = 'required'						
					}
					wrapperYear.appendChild(selectYear)

					id.appendChild(wrapperDay)
					id.appendChild(wrapperMonth)
					id.appendChild(wrapperYear)
				}else{			
					id.appendChild(selectDay)
					id.appendChild(selectMonth)
					id.appendChild(selectYear)					
				}


			}
		}catch(e){
			console.log('ERROR: ',e)
		}

	}

	return $dateSelect;
});