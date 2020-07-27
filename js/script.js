$(document).one('pageinit', function(){
	showRuns();
	$('#submitAdd').on('tap', addRun);
	$('#submitEdit').on('tap', editRun);
	$('#stats').on('tap','#deleteLink', deleteRun);
	$('#stats').on('tap','#editLink', setCurrent);
	$('#clearRuns').on('tap', clearRuns);
	
	 function showRuns(){

		var runs = getRunsObject();
	
		if(runs != '' && runs != null){
			for(var i = 0;i < runs.length;i++){
				$('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong><span  style="color: teal">'+runs[i]["date"]+
				'</span> <br><strong>TO-DO: </strong><strong><span  style="color: teal">'+runs[i]["miles"]+'</span></strong><div class="controls">' +
				'<a href="#edit" id="editLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'">Edit</a> | <a href="#" id="deleteLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'"">Delete</a></li>');
			}
			$('#home').bind('pageinit', function(){
				$('#stats').listview('refresh');
			});
		} else {
			$('#stats').html('<p>You have no upcoming events ahead</p>');
		}
	 }
	
	 function addRun(){
		// Get form values
		var miles = $('#addMiles').val();
		var date = $('#addDate').val();
		var run = {
			date: date,
			miles:miles
		};
		
		var runs = getRunsObject();
		runs.push(run);
		localStorage.setItem('runs', JSON.stringify(runs));
		window.location.href="index.html";
		
		return false;
	 }
	 
	 function editRun(){
		currentMiles = localStorage.getItem('currentMiles');
		currentDate = localStorage.getItem('currentDate');
		
		var runs = getRunsObject();
		for(var i = 0;i < runs.length;i++){
			if(runs[i].miles == currentMiles && runs[i].date == currentDate){
				runs.splice(i,1);
			}
			localStorage.setItem('runs',JSON.stringify(runs));
		}
		
		var miles = $('#editMiles').val();
		var date = $('#editDate').val();
		
		var update_run = {
			date: date,
			miles: miles
		};
		
		runs.push(update_run);
		
		localStorage.setItem('runs', JSON.stringify(runs));
		
		window.location.href="index.html";
		
		return false;
	 }
	 
	 function clearRuns(){
		if(confirm("Are you Sure")==true)
		{
			localStorage.removeItem('runs');
			$('#stats').html('<p>You have no upcoming events ahead</p>');
		}
	 }
	 function deleteRun(){
		
		if(confirm("Are you sure?")==true)
		{
		localStorage.setItem('currentMiles', $(this).data('miles'));
		localStorage.setItem('currentDate', $(this).data('date'));
		currentMiles = localStorage.getItem('currentMiles');
		currentDate = localStorage.getItem('currentDate');
		
		var runs = getRunsObject();
		for(var i = 0;i < runs.length;i++){
			if(runs[i].miles == currentMiles && runs[i].date == currentDate){
				runs.splice(i,1);
			}
			localStorage.setItem('runs',JSON.stringify(runs));
		}
		
		window.location.href="index.html";
		
		return false;
	 }
	 }
	 
	 function getRunsObject(){
		var runs = new Array();
		
		var currentRuns = localStorage.getItem('runs');
		
		if(currentRuns != null){
			
			var runs = JSON.parse(currentRuns);
		}
		return runs.sort(function(a, b){return new Date(a.date) - new Date(b.date)});
	 }
	
	 function setCurrent(){
		
		localStorage.setItem('currentMiles', $(this).data('miles'));
		localStorage.setItem('currentDate', $(this).data('date'));
		
		$('#editMiles').val(localStorage.getItem('currentMiles'));
		$('#editDate').val(localStorage.getItem('currentDate'));
	 }
});