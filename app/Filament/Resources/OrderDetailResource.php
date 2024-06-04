<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderDetailResource\Pages;
use App\Filament\Resources\OrderDetailResource\RelationManagers;
use App\Models\OrderDetail;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use PhpParser\Node\Stmt\Label;
use Malzariey\FilamentDaterangepickerFilter\Filters\DateRangeFilter;
use Carbon\Carbon;

class OrderDetailResource extends Resource
{
    protected static ?string $model = OrderDetail::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static bool $shouldRegisterNavigation = false;
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('order_id')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('product_id')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('color_id')
                    ->numeric()
                    ->default(null),
                Forms\Components\TextInput::make('size_id')
                    ->numeric()
                    ->default(null),
                Forms\Components\TextInput::make('design_id')
                    ->numeric()
                    ->default(null),
                Forms\Components\TextInput::make('quantity')
                    ->required()
                    ->numeric()
                    ->default(1),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('order_id')
                ->label('Orden')
                ->numeric()
                ->sortable(),
                Tables\Columns\TextColumn::make('product_id')
                    ->label('Producto')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('color_id')
                    ->label('Color')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('size_id')
                    ->label('Talla')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('design_id')
                    ->label('Diseño')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('quantity')
                    ->label('Cantidad')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Fecha de Registro')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                
            ])
            ->actions([
                //Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrderDetails::route('/'),
            'create' => Pages\CreateOrderDetail::route('/create'),
            'edit' => Pages\EditOrderDetail::route('/{record}/edit'),
        ];
    }
}
