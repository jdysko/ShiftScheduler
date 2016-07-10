def hbSelect(id, oList, className=""):
    body = []

    body.append('<select id ="' + str(id) + '" class="' + str(className) + '">')
    for i in range(1, len(oList), 1):
        body.append('<option value="' + str(i) + '">' + str(oList[i]) + '</option>')
    body.append("</select>")
    return str.join('', body)

# def hbAppend(parent, a):
