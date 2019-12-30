Simple plugin to select birthday


</br>


## Basic usage

```html
<script src="dist/birthday-select.min.js"></script>
```

```js
var firstSelect = new dateSelect({
  id: '#dateSelect-1',
  lang: "de"
});

firstSelect.init();
```
<h3>
	<a href="https://demo.webexp.site/birthday-select/" target="_blank">Demo</a>
</h3>
</br>


## Options


| Name              | Default             | Other
| ----------------- | ------------------- | -----------------
| <b>properties</b> |                                                                                                                                                                  
| id                | null                | selector                                                                                                                                 
| minYear           | 1900                | number  
| maxYear           | this year           | number  
| bootstrap         | false               | true  
| labels            | []                  | ['label-1-name ','label-2-name','label-3-name']  

</br>


## IE Support
=> 9
</br>


 ## License

MIT         