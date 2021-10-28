const easyClasses = new Set(["FOR2662", "MDU4003", "ENT3003", "PLP2000", "GEO2200", "GEO2200l",
"SPM3204", "FOR4934", "DAA1000", "PEN1136", "CLP2001", "MUL2010", "WIS2552", "EEX3093",
"FOS2001", "ARH2000", "FOS3042", "ARC1720", "URP3001", "CLT3370", "MUH4016", "WIS2040", 
"SDS4410", "ANT3451", "VIC3001", "SDS3482", "ORH1030", "SOP4777", "AST1002", "BSC2005",
"ADV3008", "WST2611", "SPM2000", "SPC2300", "AEB2014", "ANS2002", "FOR4934", "FRC1010",
"GLY1102", "EME2040", "GEO2242", "LIN3010", "EIN3354", "SDS3481", "LEI2181", "GEO2426",
"HSC3537", "SWS2007", "SWS3022", "CLP4110", "SYG2000", "WST3371", "PSY4625", "ENY4573",
"THE2000"])


function getLink(text){
    var instructorFL = text.split(" ")
    var rmpLink = 'https://www.ratemyprofessors.com/search/teachers?query='+  instructorFL.join('%20') + '&sid=U2Nob29sLTExMDA='
    return rmpLink
}


function addRmpLink(added_node){
    let nameNodes = $(added_node).find('p.MuiTypography-root.sc-GqePz.eYjLvo.MuiTypography-body1')
    if (nameNodes.length == 1){
        let nameNode = $(nameNodes[0])
        if(!nameNode.attr("visited")){
            nameNode.attr("visited", "true")
            let text = nameNode.text()
            rmpLink = getLink(text)
            nameNode.wrap('<a target="_blank" rel="noopener noreferrer" href='+ rmpLink + '></a>')    
        }
    }
}

function highlightEasy(added_node){
    let titleNodes = $(added_node).find("p.MuiTypography-root.sc-jeGTLq.dNwACa.MuiTypography-body1")
    if(titleNodes.length == 1){
        let titleNode = $(titleNodes[0])
        if(!titleNode.attr("visited")){
            titleNode.attr("visited", "true")
            let courseCode = titleNode.text().split(" ")[0]
            if(easyClasses.has(courseCode)){
                titleNode.attr("style", "color: green !important;") 
            }  
        }
    }
}

function removeFull(added_node){
    let seatsNode = $(added_node).find(".MuiChip-label")
    let seatsText = $(seatsNode).text()
    if(seatsNode.length == 0 || (seatsText != "" && !seatsText.includes("Seats:"))){
        try{
            console.log("zap")
            $(added_node).remove()
        }
        catch(error){
            console.log("failed to zap")
        }
    }
}

const observer = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
        chrome.storage.sync.get({
            add_rmp_links: true,
            highlight_easy_classes: true,
            hide_full_classes: false
          }, function(items) {
            const add_rmp_links = items.add_rmp_links;
            const highlight_easy_classes = items.highlight_easy_classes;
            const hide_full_classes = items.hide_full_classes;
            mutation.addedNodes.forEach(function(added_node) {
                if($(added_node).is(".accordion__container")){
                    if(highlight_easy_classes){
                        highlightEasy(added_node)
                    }
                    if(hide_full_classes){
                        removeFull(added_node)
                    }
                }
                else{
                    if(add_rmp_links){
                        addRmpLink(added_node)
                    }
                }    
            });
          });
	});
});

observer.observe(document.querySelector(".MuiPaper-root.sc-ezredP.dEHhul.MuiPaper-outlined.MuiPaper-rounded"), { subtree: true, childList: true });