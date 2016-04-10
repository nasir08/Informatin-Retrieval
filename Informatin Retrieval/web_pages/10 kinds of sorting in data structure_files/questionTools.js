
QuestionTools=AquaAjaxResponse.prototype.inherit("QuestionToolsFetcher",{el:false,init:function(el){if(!this.el){this.el=el;var data={title:jQuery("#WikiAnswers").data("title")};var url=jwgData.config.wgServer+'/ajax/questionTools.php';this.postJson(url,data);}
return false;},updateLHSMenu:function(html){jQuery("#leftMenuLoggedIn").find(".dsContent").html(html);},fetchLHSMenu:function(){if("undefined"==typeof LHSMenunAjaxResponse){LHSMenuAjaxResponse=AquaAjaxResponse.prototype.inherit("LHSMenuAjaxResponse",{status200:function(data){var questionTools=new QuestionTools();questionTools.updateLHSMenu(data.html);},statusERROR:function(data){trackError(data.message);alert("Error: "+data.message);}});}
var data={jsonly:1,title:jQuery("#WikiAnswers").data("title")};var url=jwgData.config.wgServer+'/ajax/lhsMenu.php';var ajaxResponse=new LHSMenuAjaxResponse();ajaxResponse.postJson(url,data);return false;},fetchSideBar:function(){var data={title:jQuery("#WikiAnswers").data("title"),sidebar:true};var url=jwgData.config.wgServer+'/ajax/questionTools.php';this.postJson(url,data);},statusSHOW:function(data){jQuery(this.el).after(data.html);jQuery("#questionToolsTrigger").unbind("click");initializeMenu("#questionToolsTrigger","dropDownOrUp");jQuery("#questionToolsTrigger").trigger("click");handleBlockedUserDisFunctionality();},statusSIDEBAR:function(data){jQuery("#questionToolsSideBarArticle").replaceWith(data.html);},statusERROR:function(data){trackError(data.message);delete(QuestionToolsAjaxResponse);alert("Error: "+data.message);},openTrash:function(lpos){track("Trash",lpos);this.fetch({"ajax/questionTools/untrash.js":"AquaUnTrash","ajax/questionTools/trash.js":"AquaTrash"},["ajax/questionTools/trash.css"],"trash","AquaTrash","open");return false;},unlockQuestion:function(lposPrefix){track('unlockQuestion',lposPrefix);if("undefined"==typeof UnlockQuestion){UnlockQuestion=AquaAjaxResponse.prototype.inherit("UnlockQuestion",{url:url=jwgData.config.wgServer+'/ajax/preserveQuestion.php',id:null,post:function(data){data.action="unlockModal";return this.postJson(this.url,data);},statusMODAL:function(data){this.id="unlockModal";jQuery('<div id="'+this.id+'"></div>').html(data.html).appendTo("body");openDialog("#"+this.id,"modal");},unlock:function(lposPrefix){this.close();questionTools.preserveQuestion(lposPrefix,false);},close:function(){closeDialog("#"+this.id);}});}
unlockQuestion=new UnlockQuestion();unlockQuestion.post({lposPrefix:lposPrefix});return false;},preserveQuestion:function(lposPrefix,on){if("undefined"==typeof on){on=true;}
track("Admin"+(on?"P":"Unp")+"reserve",lposPrefix);if("undefined"==typeof PreserveQuestionAjaxResponse){PreserveQuestionAjaxResponse=AquaAjaxResponse.prototype.inherit("PreserveQuestionAjaxResponse",{status200:function(data){jQuery("#WikiAnswers").data("etag",data.etag);jQuery("#protected").removeClass("protected");jQuery("#preserved").toggleClass("preserved");this.togglePreserveLink(data.isPreserved);var questionTools=new QuestionTools();questionTools.updateLHSMenu(data.lhsMenuHTML);},togglePreserveLink:function(isPreserved){if(isPreserved){jQuery("#preserveQuestion").hide();jQuery("#unpreserveQuestion, #preservedContainer").show();jQuery("#questionImproveLinkContainer, #answerImproveLinkContainer").find("button").hide();jQuery("#improveAnswerBtn, #discussQuestionBtn, .addthis_toolbox, #canYouAnswerText, #noAnswerButtonBar").addClass("hide");}else{jQuery("#preserveQuestion").show();jQuery("#unpreserveQuestion, #preservedContainer").hide();jQuery("#questionImproveLinkContainer, #answerImproveLinkContainer").find("button").show();jQuery("#improveAnswerBtn, #discussQuestionBtn, .addthis_toolbox, #canYouAnswerText, #noAnswerButtonBar").removeClass("hide");}},status409024:function(data){trackError("409024 "+data.message);window.location.reload(true);},statusERROR:function(data){trackError(data.message);alert("Error: "+data.message);}});}
var data={jsonly:1,action:(on?"preserve":"unlock"),title:jQuery("#WikiAnswers").data("title"),etag:jQuery("#WikiAnswers").data("etag")};var url=jwgData.config.wgServer+'/ajax/preserveQuestion.php';var ajaxResponse=new PreserveQuestionAjaxResponse();ajaxResponse.postJson(url,data);return false;},openRateLink:function(linkNo){track("OpenRateLink");this.fetch({"ajax/questionTools/rateLink.js":"RateLink"},["ajax/questionTools/rateLink.css"],"rateLink","RateLink","open",[linkNo]);return false;},blankTool:function(title,etag,id){var blankedId=jQuery("#"+id);if("undefined"==typeof BlankToolAjaxResponse){BlankToolAjaxResponse=AquaAjaxResponse.prototype.inherit("BlankToolAjaxResponse",{status200:function(data){blankedId.find(".snippet").html("Answer deleted");var onclick=new Function("questionTools.unblankTool('"+title+"' , "+data.etag+", "+id+", "+data.lastRevisionId+")");blankedId.find(".blankingToolLink").removeClass().addClass("undoToolLink").attr({"title":"Undo Delete","onclick":''}).unbind("click").click(onclick);},statusERROR:function(data){trackError(data.message);alert("Error: "+data.message);}});}
var data={jsonly:1,action:"blank",title:title,etag:etag,revertTo:blankedId.data("rc")}
var url=jwgData.config.wgServer+'/ajax/blankTool.php';var ajaxResponse=new BlankToolAjaxResponse();var resp=ajaxResponse.postJson(url,data);},unblankTool:function(title,etag,id,revertTo){var unblankedId=jQuery("#"+id);if("undefined"==typeof UnblankToolAjaxResponse){UnblankToolAjaxResponse=AquaAjaxResponse.prototype.inherit("UnblankToolAjaxResponse",{status200:function(data){unblankedId.find(".answerSnippet").html(data.answer);},statusERROR:function(data){trackError(data.message);alert("Error: "+data.message);}});}
var data={jsonly:1,action:"unblank",title:title,etag:etag,revertTo:revertTo}
var url=jwgData.config.wgServer+'/ajax/blankTool.php';var ajaxResponse=new UnblankToolAjaxResponse();var resp=ajaxResponse.postJson(url,data);}});function submitFeatureQuestion(on,lpos){lid=((on)?"":"Un")+"Feature";track(lid,lpos);if("undefined"==typeof FeaturedQuestionAjaxResponse){FeaturedQuestionAjaxResponse=AquaAjaxResponse.prototype.inherit("FeaturedQuestionAjaxResponse",{status200:function(data){jQuery("#WikiAnswers").data("etag",data.etag);toggleFeatureLink(data.isFeatured);},statusERROR:function(data){trackError(data.message);alert("Error: "+data.message);}});}
var data={jsonly:1,title:jQuery("#WikiAnswers").data("title"),etag:jQuery("#WikiAnswers").data("etag"),toFeature:(on)?1:0};var url=jwgData.config.wgServer+'/ajax/featuredQuestion.php';var ajaxResponse=new FeaturedQuestionAjaxResponse();var resp=ajaxResponse.postJson(url,data);}
function toggleFeatureLink(isFeatured){if(isFeatured){jQuery("a[href$=#feature]").parent().hide();jQuery("a[href$=#unfeature]").parent().show();}else{jQuery("a[href$=#feature]").parent().show();jQuery("a[href$=#unfeature]").parent().hide();}}
function submitProtectQuestion(on,lpos){lid=((on)?"":"Un")+"Protect";track(lid,lpos);if("undefined"==typeof ProtectQuestionAjaxResponse){ProtectQuestionAjaxResponse=AquaAjaxResponse.prototype.inherit("ProtectQuestionAjaxResponse",{status200:function(data){jQuery("#WikiAnswers").data("etag",data.etag);toggleProtectLock(data.isProtected);toggleProtectLink(data.isProtected);toggleProtectMessage(data.isProtected,data.message);var questionTools=new QuestionTools();questionTools.updateLHSMenu(data.lhsMenuHTML);},status409002:function(data){trackError("409002 "+data.message);window.location.reload(true);},statusERROR:function(data){trackError(data.message);alert("Error: "+data.message);}});}
var data={jsonly:1,title:jQuery("#WikiAnswers").data("title"),etag:jQuery("#WikiAnswers").data("etag"),toProtect:(on)?1:0};var url=jwgData.config.wgServer+'/ajax/protectQuestion.php';var ajaxResponse=new ProtectQuestionAjaxResponse();var resp=ajaxResponse.postJson(url,data);}
function toggleProtectLock(isProtected){if(isProtected){jQuery("#protected").addClass("protected");jQuery("#questionImproveLinkContainer").find("button").hide();}else{jQuery("#protected").removeClass("protected");jQuery("#questionImproveLinkContainer").find("button").show();}}
function toggleProtectLink(isProtected){if(isProtected){jQuery("#protectQuestion").hide();jQuery("#unprotectQuestion").show();}else{jQuery("#protectQuestion").show();jQuery("#unprotectQuestion").hide();}}
function toggleProtectMessage(isProtected,message){if(isProtected){jQuery("#postAnswerMessage").html(message).show();}else{jQuery("#postAnswerMessage").html("").hide();}}
function submitPermanentlyDelete(){track("permanentlyDeleteOK");if("undefined"==typeof DeleteQuestionAjaxResponse){DeleteQuestionAjaxResponse=AquaAjaxResponse.prototype.inherit("DeleteQuestionAjaxResponse",{status200:function(data){jQuery("#permanentlyDeleteConfirm").dialog("close");initializeDialog("<div id='permanentlyDeleted'>"+data.message+"</div>","modal",{buttons:{"OK":function(){window.location.href='/';}}});jQuery("#permanentlyDeleted").dialog("open");jQuery(".ui-dialog-titlebar-close").click(function(){window.location.href='/';});},statusERROR:function(data){trackError(data.message);alert("Error: "+data.message);}});}
var data={jsonly:1,title:jQuery("#WikiAnswers").data("title"),etag:jQuery("#WikiAnswers").data("etag")}
var url=jwgData.config.wgServer+'/ajax/deleteQuestion.php';var ajaxResponse=new DeleteQuestionAjaxResponse();var resp=ajaxResponse.postJson(url,data);}
function confirmPermanentlyDelete(lpos){track("AdminPermDelete",lpos);if(jQuery("#permanentlyDeleteConfirm").length==0){jQuery("body").append('<div id="permanentlyDeleteConfirm" class="hide"><b>Warning: The page you are about to delete has a history: <a href="#" class="seePageHistory" onclick="trackAndGo(this, \'seePageHistory\');return false">Page history</a></b><br><br>You are about to permanently delete a page along with all of its history from the database. Please confirm that you intend to do this, that you understand the consequences, and that you are doing this in accordance with <a href="/help/trashing_questions" onclick="track(\'seeTrashingPolicy\');">Answers.com Trashing Policy</a>.</div>');jQuery("#permanentlyDeleteConfirm").find(".seePageHistory").attr('href','/Q/Special:Changes&cv=question:'+jwgData.waQuestionUrl);}
openDialog("#permanentlyDeleteConfirm","confirmModal",{"okFunction":submitPermanentlyDelete,"cancelTracking":"permanentlyDeleteCancel"});return false;}
windowOnload(function(){questionTools=new QuestionTools();});