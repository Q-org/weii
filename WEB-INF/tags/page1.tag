<%@ tag pageEncoding="UTF-8"%>

<script type="text/javascript">

function page_go()
{
	page_validate();		
	document.forms[0].submit();
}

function page_first()
{
	var pageNo=document.forms[0].elements["pageResult.pageNo"].value;
	if(pageNo!=1){
		document.forms[0].elements["pageResult.pageNo"].value = 1;
		document.forms[0].submit();
	}else{
		document.getElementById("p1").disabled='disabled';
	}
}

function page_pre()
{
	var pageNo = document.forms[0].elements["pageResult.pageNo"].value;
	if(pageNo!=1){
		document.forms[0].elements["pageResult.pageNo"].value = parseInt(pageNo) - 1;
		page_validate();
		document.forms[0].submit();
	}else{
		document.getElementById('p2').disabled='disabled';
	}
}

function page_next()
{
	var pageNo = document.forms[0].elements["pageResult.pageNo"].value;
	if(pageNo!=${totalNo}){
		document.forms[0].elements["pageResult.pageNo"].value = parseInt(pageNo) + 1;
		page_validate();
		document.forms[0].submit();
	}else{
		document.getElementById('p3').disabled='disabled';
	}
}

function page_last()
{
	var pageNo=document.forms[0].elements["pageResult.pageNo"].value;
	if(pageNo!=${totalNo}){
		document.forms[0].elements["pageResult.pageNo"].value = ${totalNo};
		document.forms[0].submit();
	}else{
		document.getElementById('p4').disabled='disabled';
	}
}

function page_validate()
{
	var pageTotal = ${totalNo };
	var pageNo = document.forms[0].elements["pageResult.pageNo"].value;
	if (pageNo<1)pageNo=1;
	if (pageNo>pageTotal)pageNo=pageTotal;
	document.forms[0].elements["pageResult.pageNo"].value = pageNo;
				
	var recTotal = ${totalCount };
	var pageSize = document.forms[0].elements["pageResult.pageSize"].value;
	if(pageSize<1)
	{
		pageSize=1;
	}
	if(pageSize>recTotal)
	{
		pageSize=recTotal;
		document.forms[0].elements["pageResult.pageSize"].value = pageSize;
	}	
}
</script>
<a id="p1" href="javascript:page_first();" style="text-decoration :none;">[首页]</a>&nbsp;
<a id="p2" href="javascript:page_pre();" style="text-decoration :none;">[上页]</a>&nbsp;
<a id="p3" href="javascript:page_next();" style="text-decoration :none;">[下页]</a>&nbsp;
<a id="p4" href="javascript:page_last();" style="text-decoration :none;">[尾页]</a>&nbsp;
共&nbsp;<b>${totalCount }</b>&nbsp;条记录	
第<input name="pageResult.pageNo" value="${pageNo }" size="1" onblur="return ifnumber(this);"/>页
/ 共&nbsp;<b>${totalNo }</b>&nbsp;页 &nbsp;
<a class="common_button" onclick="javascript:page_go();">GO</a>&nbsp;&nbsp;
