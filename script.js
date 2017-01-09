var totalMonthlySalary = 0;
$(function(){

$('#newEmployeeForm').on('submit', function(event){

  event.preventDefault();
  var newEmployee = $(this).serializeArray();

  var newEmployeeObject = {};

  for(var i = 0; i < newEmployee.length; i++){
    var inputFieldName = newEmployee[i].name;
    var inputFieldValue = newEmployee[i].value;
    newEmployeeObject[inputFieldName] = inputFieldValue;
  }

  var $newRow = $('<tr><td>' + newEmployeeObject.firstName + '</td><td>' + newEmployeeObject.lastName + '</td><td>' + newEmployeeObject.idNumber + '</td><td>' + newEmployeeObject.jobTitle + '</td><td>' + newEmployeeObject.annualSalary + '</td></tr>');

  var $deleteButton = $('<td><button class="deleteButton">Delete</button></td>')

  $deleteButton.data('salary', newEmployeeObject.annualSalary);
  console.log("data is: " + $deleteButton.data('salary'));

  // console.log($newRow);
  $newRow.append($deleteButton);

  $('#employeesTable').append($newRow);
  updateMonthlySalary(newEmployeeObject.annualSalary)
  clearForm();
  console.log(totalMonthlySalary);

});

$('#employeesTable').on('click', '.deleteButton', function(){

  console.log($(this).parent().data('salary'));
  updateMonthlySalary(-$(this).parent().data('salary'));
  $(this).parent().parent().remove();

});
});

function clearForm() {
  $('form').find('input[type=text]').val('');
}

function updateMonthlySalary(newEmployeeSalary){
  totalMonthlySalary += newEmployeeSalary / 12;
  $('#monthlySalary').text(totalMonthlySalary.toLocaleString("en-US", {style: 'currency', currency: 'USD'}));
}
