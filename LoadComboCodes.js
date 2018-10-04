
function loadComboCodes(filterName, getDataFilePath, comboObjectName, valSelected) {
    // expects Code and Name 
    Cmti.Debug.Log('Getting ' + filterName + ' data...');
    $.ajax({
        url: getDataFilePath,
        data: Cmti.Util.URL_SALT,
        dataType: 'json',
        success: function (returnObj) {
            Cmti.Debug.Log('Loading ' + filterName + ' data from', returnObj);
            if (returnObj.error.errorNum == 0) {
                var target = $(comboObjectName);
                boptionSelected = false;
                for (var i = 0; i < returnObj.data.length; i++) {
                    var curOption = returnObj.data[i];

                    Cmti.Debug.Log(curOption);
                    optionSelected = '';
                    if (valSelected.indexOf(curOption.Code) >= 0) {
                        optionSelected = 'selected';
                        boptionSelected = true;
                    }
                    target.append('<option value="' + curOption.Code + '" ' + optionSelected + '>' + curOption.Name + '</option>');
                }
                if (!boptionSelected) $(comboObjectName).val('');
                target.closest('div').find('.loading').remove();
            } else {
                Cmti.Debug.Error('There was an error loading the ' + filterName + ' data');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Cmti.Debug.Log('Error loading ' + filterName + ' data', errorThrown);
        }
    });
}