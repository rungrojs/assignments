import { FlatList, FlatListProps, View } from "react-native";
import { Button, Icon, Text } from "react-native-paper";
import { RankingModel } from "../models/ranking.model";
import { useCallback, useState } from "react";
import { TOKENS, container } from "../services/service-container";
import { useFocusEffect } from "@react-navigation/native";

export default function Leaderboard() {
  let leaderboardService = container.get(TOKENS.leaderboardService);
  const fecthSize = 15;
  const [data, setData] = useState<RankingModel[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      leaderboardService
        .getCurrentRanking(0, fecthSize)
        .then((rankingData) => {
          setData(rankingData);
          setIsEnd(rankingData.length < fecthSize);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }, [])
  );

  const loadMoreData = () => {
    if (isEnd || isLoading) {
      return;
    }
    setIsLoading(true);
    leaderboardService
      .getCurrentRanking(data?.length ?? 0, fecthSize)
      .then((rankingData) => {
        setData([...data, ...rankingData]);
        setIsEnd(rankingData.length < fecthSize);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const renderItem = ({ item }: { item: RankingModel }) => (
    <View
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        flex: 1,
        flexDirection: "row",
      }}>
      <View style={{ minWidth: 40 }}>
        {item.order == 1 && (
          <Icon source="chess-queen" color={"#b8860b"} size={20} />
        )}
      </View>
      <Text style={{ minWidth: 40 }}>{item.order}</Text>
      <View
        style={{
          flexWrap: "nowrap",
          flexGrow: 1,
          flexDirection: "row",
          overflow: "hidden",
        }}>
        <Text>{item.name}</Text>
      </View>
      <Text
        style={{
          minWidth: 40,
          textAlign: "right",
        }}>
        {item.score}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, flexDirection: "column", paddingTop: 50 }}>
      <View
        style={{
          position: "absolute",
          top: 0,
          flexGrow: 0,
          padding: 16,
          borderBottomColor: "#ddd",
          flex: 1,
          flexDirection: "row",
        }}>
        <View style={{ minWidth: 40 }}></View>
        <Text style={{ minWidth: 40 }}>No.</Text>
        <Text style={{ flexGrow: 1, overflow: "hidden" }}>Username</Text>
        <Text
          style={{
            minWidth: 40,
            textAlign: "right",
          }}>
          SCORE
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id?.toString() ?? ""}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.03}
      />
      {isLoading && (
        <View
          style={{
            padding: 20,
            backgroundColor: "#f3f3f3",
            width: "100%",
            position: "absolute",
            bottom: 0,
            flexGrow: 0,
            alignItems: "center",
          }}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
}
