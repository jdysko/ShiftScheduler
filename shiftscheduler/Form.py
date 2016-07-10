from dbConnector import dbconnector


class Form():
    def __init__(self, parent):
        self.dbpool = parent.dbpool
        self.dbc = dbconnector(self.dbpool)
        self.DBInputParams = {
            "GridID": 0
        }
        self.FormData = {

            "Grids": [],
            "Cards": [
                {
                    "id": 0,
                    "Name": "",
                    "CardFields": [
                        {
                            "Label": "",
                            "Value": ""
                        }
                    ]

                }
            ],
            "SFGrids": [
                {
                    "ID": 0,
                    "Name": "",
                    "Header": [],
                    "SQLData": {}
                }
            ]
        }

        self.eventInput = {

            "tabSelected": 0

        }

    def getParamsFromInput(self, data):
        self.eventInput = data['eventInput']

    def morph(self, data):
        # self.getParamsFromInput(data)
        if data[0]["route"] == "init":
            self.setInitialFormData()
        return self.FormData

    def setInitialFormData(self):
        self.getGridData(self.FormData)
        # self.getCards()
        # self.getSFTabs(self.FormData["Cards"][0])
        # self.getSFGridData(self.FormData["SFGrids"])

    def getGridData(self, node):
        if node == self.FormData:
            sql = "Grids"
        else:
            sql = "SFGrids"

        d = self.dbc.SelectProcedure("get" + sql)
        for x in d:
            self.DBInputParams["GridID"] = x.get("id")
            sqldata = self.getSQLData(x.get("ID_SqlSources"), None)
            node["Grids"].append({
                "ID": x.get("id"),
                "Name": x.get("Name"),
                "SQLData": sqldata,
                "Header": sqldata[0].keys(),

            })

    def getSQLData(self, id, args):
        d = self.dbc.SelectProcedureFromSource(id, args)
        r = []
        for x in d:
            r.append(x)
        return r

    def getCards(self):
        d = self.dbc.SelectProcedure("getCards", self.DBInputParams["GridID"])
        for x in d:
            cf = self.getCardFields(d[x]["id"])
            self.FormData["Cards"].append({
                "id": d[x]["id"],
                "Name": d[x]["Name"],
                "CardFields": cf,

            })

    def getCardFields(self, id):
        d = self.dbc.SelectProcedure("getCardFields", id)
        cf = []
        for x in d:
            cf.append({
                "Label": d[x]["Label"],
                "Value": d[x]["Value"]
            })
        return d

    def getSFGrids(self, param):

        self.getGridData(self.FormData["SFGrids"])
