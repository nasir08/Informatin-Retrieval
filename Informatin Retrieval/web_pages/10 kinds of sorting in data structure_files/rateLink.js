
RateLink=AquaAjaxResponse.prototype.inherit("RateLink",{mapRate2Str:["unrated","good","bad"],postUrl:jwgData.config.wgServer+'/ajax/rateLink.php',linkId:-1,open:function(linkId){var data={action:"getForm",linkId:linkId,linkUrl:this.getLinkUrl(linkId)};this.post(data);},post:function(data){var resp=this.postJson(this.postUrl,data);return resp;},statusFORM:function(data){var form=jQuery("#rateLinkForm");if(form.length<1){form=jQuery('<div id="rateLinkForm"></div>').appendTo("body");}
form.html(data.html);var table=jQuery("#rateLinkUrls");var self=this;table.find("input[type='radio']").click(function(){var input=jQuery(this);var rate=input.val();var urlNo=parseInt(input.attr("name").replace("rate_",""));if(rate!="0"){self.propagate(urlNo+1,i+1,rate);}
if(0==urlNo){self.toggleDomain(rate);}});jQuery("input[name='rate_0']:checked").click();this.linkId=data.linkId;openDialog("#rateLinkForm","wideModal");},statusSAVED:function(data){this.setLinksDiv(data.html);this.close();},close:function(){closeDialog("#rateLinkForm");return false;},save:function(){track("SaveRateLink");var i=0;var ratings={};jQuery("#rateLinkUrls input[name^='rate_']:checked").each(function(i,el){var input=jQuery(this);var url=input.parents("tr").find("td:first-child").text();ratings[url]=input.val();});var data={action:"rate",titleDbKey:jwgData.waQuestionUrl,linkId:this.linkId,linkUrl:this.getLinkUrl(this.linkId),ratings:ratings};this.post(data);},getLinkUrl:function(linkId){return jQuery("#relatedWebLinks ul li:eq("+linkId+") a:first-child").attr("href");},setLinksDiv:function(html){jQuery("#relatedWebLinks").replaceWith(html);},toggleDomain:function(rate){if("2"==rate){jQuery("#domainOther .unratedLink").hide();jQuery("#domainOther .badLink").show();}else{jQuery("#domainOther .badLink").hide();jQuery("#domainOther .unratedLink").show();}},propagate:function(from,to,rate){for(var i=from;i<to;i++){if(jQuery("#rate_"+i+"_unrated:checked").length>0){jQuery("input[id='rate_"+i+"_"+this.mapRate2Str[rate]+"']").prop("checked",true);}}}});