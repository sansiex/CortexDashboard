// ��ȡ����������ݣ�����һ��json��ʽ�Ķ���
// ���� form Ϊ������filler Ϊ�ַ���
// ���ڱ��п�ֵ��Ԫ�أ�Ĭ�Ϻ��ԣ�Ҳ�����������ֵ��filler ������ֵ
function getFormData (form, filler) {
	var data = {};
	for (var i = 0; i < form.length; ++i) {
		var name = form[i].name;
		var value = form[i].value;
		if (name.length == 0)
			continue;
		if (value.length == 0) {
			if ((typeof filler != 'string') || (filler.length == 0))
				continue;
			else
				value = filler;
		}
		var sz = "data."+name+" = '" + value + "'";
		try {
			eval(sz);
		} catch (e) {
			alert(e);
		}
		data[name]=value;
	}
	return data;
}

function display(data){
	var area=$('#response_text')[0];
	area.innerText=data;
}

function gitClone(){
	display('Please waiting for operating...');
	sendCloneRequest('git_input','/git/clone',display);
}

function sendCloneRequest(formId,url,callback){
	var form=$('#'+formId)[0];
	var data=getFormData(form);
	$.post(url,data,callback);
}

