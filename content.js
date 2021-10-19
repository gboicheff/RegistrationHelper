function getLink(text){
    var instructorFL = text.split(" ")
    var rmpLink = 'https://www.ratemyprofessors.com/search/teachers?query='+  instructorFL.join('%20') + '&sid=U2Nob29sLTExMDA='
    return rmpLink
}

const observer = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
		mutation.addedNodes.forEach(function(added_node) {
            let node = $(added_node).find('p.MuiTypography-root.sc-GqePz.eYjLvo.MuiTypography-body1')
            console.log(node)
            if (node.length == 1){
                node = $(node[0])
                if(!node.attr("visited")){
                    node.attr("visited", "true")
                    let text = node.text()
                    rmpLink = getLink(text)
                    console.log(text)
                    node.wrap('<a target="_blank" rel="noopener noreferrer" href='+ rmpLink + '></a>')
    
                }
            }
		});
	});
});

observer.observe(document.querySelector(".MuiPaper-root.sc-ezredP.dEHhul.MuiPaper-outlined.MuiPaper-rounded"), { subtree: true, childList: true });